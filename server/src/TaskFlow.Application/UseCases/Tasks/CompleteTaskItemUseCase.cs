using FluentValidation;
using TaskFlow.Application.Exceptions;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Application.Interfaces.Persistence;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Tasks;
using TaskFlow.Application.Responses.Tasks;

namespace TaskFlow.Application.UseCases.Tasks
{
    public class CompleteTaskItemUseCase : ICompleteTaskItemUseCase
    {
        private readonly ITaskItemRepository _taskItemRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUser _currentUser;
        private readonly IValidator<CompleteTaskItemRequest> _validator;

        public CompleteTaskItemUseCase(
            ITaskItemRepository taskItemRepository,
            IUnitOfWork unitOfWork,
            ICurrentUser currentUser,
            IValidator<CompleteTaskItemRequest> validator)
        {
            _taskItemRepository = taskItemRepository;
            _unitOfWork = unitOfWork;
            _currentUser = currentUser;
            _validator = validator;
        }
        public async Task<CompleteTaskItemResponse> ExecuteAsync(
            int taskItemId,
            CompleteTaskItemRequest request)
        {
            var result = await _validator.ValidateAsync(request);

            if (!result.IsValid)
            {
                throw new ValidationException(result.Errors);
            }

            var currentUserId = _currentUser.UserId;
            var companyId = _currentUser.CompanyId;

            var taskItem = await _taskItemRepository.GetByIdForAssignedUserAsync(
                taskItemId,
                companyId,
                currentUserId);

            if (taskItem == null)
            {
                throw new NotFoundException("Task item not found or not assigned to the current user.");
            }

            taskItem.Complete(request.CompletionReport);

            var completedAt = taskItem.CompletedAt;
            if (completedAt == null)
            {
                throw new InvalidOperationException("CompletedAt should not be null after completing the task item.");
            }

            await _unitOfWork.SaveChangesAsync();

            var response = new CompleteTaskItemResponse
            {
                TaskItemId = taskItem.Id,
                Status = taskItem.Status,
                CompletedAt = completedAt.Value,
            };
            return response;
        }
    }
}