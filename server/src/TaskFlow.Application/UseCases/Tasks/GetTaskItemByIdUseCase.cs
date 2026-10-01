using TaskFlow.Application.Exceptions;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Responses.Tasks;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.UseCases.Tasks
{
    public class GetTaskItemByIdUseCase : IGetTaskItemByIdUseCase
    {
        private readonly ITaskItemRepository _taskItemRepository;
        private readonly ICurrentUser _currentUser;

        public GetTaskItemByIdUseCase(
            ITaskItemRepository taskItemRepository,
            ICurrentUser currentUser)
        {
            _taskItemRepository = taskItemRepository;
            _currentUser = currentUser;
        }

        public async Task<TaskItemResponse> ExecuteAsync(int taskItemId)
        {
            var currentUserId = _currentUser.UserId;
            var currentUserRole = _currentUser.Role;
            var currentUserCompanyId = _currentUser.CompanyId;

            TaskItem? taskItem;

            switch (currentUserRole)
            {
                case UserRole.Admin:
                    taskItem = await _taskItemRepository
                        .GetByIdForAdminAsync(taskItemId,
                        currentUserCompanyId,
                        currentUserId);
                    break;

                case UserRole.Member:
                    taskItem = await _taskItemRepository
                        .GetByIdForMemberAsync(
                        taskItemId, 
                        currentUserCompanyId, 
                        currentUserId);
                    break;

                case UserRole.Owner:
                    taskItem = await _taskItemRepository
                        .GetByIdAsync(
                        taskItemId,
                        currentUserCompanyId);
                    break;

                default:
                    throw new ForbiddenException
                        ("User role is not authorized to access this resource.");
            }
            
            if (taskItem == null)
            {
                throw new NotFoundException("Task item not found.");
            }

            var response = new TaskItemResponse
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
            
            return response;
        }
    }
}