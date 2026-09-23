using TaskFlow.Domain.Entities;

namespace TaskFlow.Application.Interfaces.Repositories
{
    public interface ITaskItemRepository
    {
        Task AddAsync(TaskItem taskItem);
    }
}
