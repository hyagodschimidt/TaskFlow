using TaskFlow.Application.Exceptions;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Application.Interfaces.Persistence;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Responses.Tasks;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.UseCases.Tasks
{
    public class StartTaskUseCase : IStartTaskUseCase
    {
        private readonly ITaskItemRepository _taskItemRepository;
        private readonly ICurrentUser _currentUser;
        private readonly ICompanyRepository _companyRepository;
        private readonly IUnitOfWork _unitOfWork;



        public StartTaskUseCase(ITaskItemRepository taskItemRepository,
            ICurrentUser currentUser,
            ICompanyRepository companyRepository,
            IUnitOfWork unitOfWork)
        {
            _currentUser = currentUser;
            _taskItemRepository = taskItemRepository;
            _companyRepository = companyRepository;
            _unitOfWork = unitOfWork;
        }


        public async Task<StartTaskResponse> ExecuteAsync(int taskItemId)
        {

            var userId = _currentUser.UserId;
            var companyId = _currentUser.CompanyId;
            var company = await _companyRepository.GetByIdAsync(companyId);
            if(company == null)
            {
                throw new NotFoundException("Company not found.");
            }

            var taskItem = await _taskItemRepository.GetByIdForAssignedUserAsync(taskItemId, companyId, userId);

            if (taskItem == null)
            {
                throw new NotFoundException("Task not found or not assigned to the current user.");
            }

            if (company.PriorityAccessPolicy == PriorityAccessPolicy.StrictPriorityLock)
            {
                if (taskItem.Priority == null)
                {
                    throw new ConflictException("Task priority is required under strict priority policy.");
                }
                var hasHigherPriority = await _taskItemRepository.HasHigherPriorityPendingTaskAsync
                    (userId,
                    companyId,
                    taskItem.Priority.Value);

                if (hasHigherPriority)
                {
                    throw new ConflictException("Cannot start this task because there are higher priority pending tasks.");
                }
            }

            taskItem.Start();

            await _unitOfWork.SaveChangesAsync();

            return new StartTaskResponse
            {
                TaskItemId = taskItem.Id,
                Status = taskItem.Status
            };
        }
    }
}
