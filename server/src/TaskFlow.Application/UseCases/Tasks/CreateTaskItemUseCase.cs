using FluentValidation;
using TaskFlow.Application.Constants;
using TaskFlow.Application.Exceptions;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Application.Interfaces.Persistence;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Tasks;
using TaskFlow.Application.Responses.Tasks;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.UseCases.Tasks
{
    public class CreateTaskItemUseCase : ICreateTaskItemUseCase
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<CreateTaskItemRequest> _validator;
        private readonly ICurrentUser _currentUser;
        private readonly ICompanyRepository _companyRepository;
        private readonly ITaskItemRepository _taskItemRepository;
        public CreateTaskItemUseCase(
            ICompanyRepository companyRepository,
            ICurrentUser currentUser,
            ITaskItemRepository taskItemRepository,
            IAppUserRepository appUserRepository,
            IUnitOfWork unitOfWork,

            IValidator<CreateTaskItemRequest> validator)
        {
            _companyRepository = companyRepository;
            _currentUser = currentUser;
            _taskItemRepository = taskItemRepository;
            _appUserRepository = appUserRepository;
            _unitOfWork = unitOfWork;
            _validator = validator;
        }
        public async Task<TaskItemResponse> ExecuteAsync(CreateTaskItemRequest request)
        {
            if (_currentUser.Role is not UserRole.Owner and not UserRole.Admin)
            {
                throw new ForbiddenException("Only Admins and Owners can create tasks.");
            }

            var result = await _validator.ValidateAsync(request);
            if (!result.IsValid)
            {
                throw new ValidationException("Invalid request", result.Errors);
            }

            var currentUserId = _currentUser.UserId;
            var currentUser = await _appUserRepository.GetByIdAsync(currentUserId);
            if (currentUser == null)
            {
                throw new NotFoundException("Current user not found.");
            }

            var companyId = currentUser.CompanyId;
            var company = await _companyRepository.GetByIdAsync(companyId);
            if (company == null)
            {
                throw new NotFoundException("Company not found.");
            }

            var assignedToUser = await _appUserRepository.GetByIdAsync(request.AssignedToUserId);
            if (assignedToUser == null)
            {
                throw new NotFoundException("Assigned user not found.");
            }

            if (assignedToUser.CompanyId != companyId)
            {
                throw new ForbiddenException("Assigned user must belong to the same company.");
            }
            if (request.Priority is null &&
               (company.DeadlineMode == DeadlineMode.CalculatedByPriority ||
               company.PriorityAccessPolicy != PriorityAccessPolicy.Free))
            {
                throw new ValidationException(ValidationMessages.RequiredPriority);
            }

            var dueDate = request.DueDate;

            if (company.DeadlineMode == DeadlineMode.CalculatedByPriority)
            {
                if (dueDate is not null)
                {
                    throw new ValidationException(
                        ValidationMessages.ManualDueDateNotAllowed);
                }

                dueDate = request.Priority switch
                {
                    TaskItemPriority.High => DateTime.UtcNow.AddDays(1),
                    TaskItemPriority.Medium => DateTime.UtcNow.AddDays(3),
                    TaskItemPriority.Low => DateTime.UtcNow.AddDays(7),
                    _ => dueDate
                };
            }

            if (company.DeadlineMode == DeadlineMode.Manual &&
                dueDate is null)
            {
                throw new ValidationException(
                    ValidationMessages.RequiredDueDate);
            }

            var taskItem = new TaskItem
            (
                title: request.Title,
                description: request.Description,
                assignedToUser: assignedToUser,
                createdByUser: currentUser,
                priority: request.Priority,
                dueDate: dueDate,
                company: company
            );

            await _taskItemRepository.AddAsync(taskItem);
            await _unitOfWork.SaveChangesAsync();

            return new TaskItemResponse
            {
                Id = taskItem.Id,
                Title = taskItem.Title,
                Description = taskItem.Description,
                AssignedToUserId = taskItem.AssignedToUserId,
                CreatedByUserId = taskItem.CreatedByUserId,
                Status = taskItem.Status,
                Priority = taskItem.Priority,
                CreatedAt = taskItem.CreatedAt,
                DueDate = taskItem.DueDate,
                CompletionReport = taskItem.CompletionReport,
                CompletedAt = taskItem.CompletedAt
            };

        }
    }
}