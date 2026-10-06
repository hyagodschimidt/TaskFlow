using TaskFlow.Application.Exceptions;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Responses.Tasks;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.UseCases.Tasks
{
    public class GetTaskItemsUseCase : IGetTaskItemsUseCase
    {
        private readonly ITaskItemRepository _taskItemRepository;

        private readonly ICurrentUser _currentUser;

        public GetTaskItemsUseCase(
            ITaskItemRepository taskItemRepository,
            ICurrentUser currentUser)
        {
            _taskItemRepository = taskItemRepository;
            _currentUser = currentUser;
        }

        public async Task<IReadOnlyList<TaskItemResponse>> ExecuteAsync()
        {
            var userId = _currentUser.UserId;
            var userRole = _currentUser.Role;
            var companyId = _currentUser.CompanyId;
            IReadOnlyList<TaskItem> taskItems;
            switch (userRole)
            {
                case UserRole.Admin:
                    taskItems = await _taskItemRepository
                        .GetForAdminAsync(companyId, userId);
                    break;
                case UserRole.Member:
                    taskItems = await _taskItemRepository
                        .GetForMemberAsync(companyId, userId);
                    break;
                case UserRole.Owner:
                    taskItems = await _taskItemRepository
                        .GetForOwnerAsync(companyId);
                    break;
                default:
                    throw new ForbiddenException
                        ("User role is not authorized to access this resource.");
            }
            return taskItems.Select(taskItem => new TaskItemResponse
            {
                Id = taskItem.Id,
                Title = taskItem.Title,
                Description = taskItem.Description,
                CompletionReport = taskItem.CompletionReport,
                Status = taskItem.Status,
                Priority = taskItem.Priority,
                DueDate = taskItem.DueDate,
                CreatedAt = taskItem.CreatedAt,
                CompletedAt = taskItem.CompletedAt,
                AssignedToUserId = taskItem.AssignedToUserId,
                CreatedByUserId = taskItem.CreatedByUserId
            }).ToList();
        }
    }
}
