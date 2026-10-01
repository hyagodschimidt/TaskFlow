using TaskFlow.Domain.Entities;

namespace TaskFlow.Application.Interfaces.Repositories
{
    public interface ITaskItemRepository
    {
        Task AddAsync(TaskItem taskItem);

        Task<TaskItem?> GetByIdAsync(int id, int companyId); 

        Task<TaskItem?> GetByIdForAdminAsync(int id, int companyId, int userId);

        Task<TaskItem?> GetByIdForMemberAsync(int id, int companyId, int userId);
    }
}
