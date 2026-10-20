using Microsoft.EntityFrameworkCore;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Infrastructure.Persistence.Repositories
{
    public class TaskItemRepository : ITaskItemRepository
    {
        private readonly AppDbContext _context;

        public TaskItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(TaskItem taskItem)
        {
            await _context.Tasks.AddAsync(taskItem);
        }

        public async Task<TaskItem?> GetByIdAsync(
            int id,
            int companyId)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(t =>
                    t.Id == id &&
                    t.CompanyId == companyId);
        }

        public async Task<TaskItem?> GetByIdForAdminAsync(
            int id,
            int companyId,
            int userId)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(t =>
                    t.Id == id &&
                    t.CompanyId == companyId &&
                    (t.AssignedToUserId == userId ||
                     t.CreatedByUserId == userId));
        }

        public async Task<TaskItem?> GetByIdForAssignedUserAsync(
            int id,
            int companyId,
            int userId)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(t =>
                    t.Id == id &&
                    t.CompanyId == companyId &&
                    t.AssignedToUserId == userId);
        }

        public async Task<IReadOnlyList<TaskItem>> GetForOwnerAsync(
            int companyId)
        {
            return await _context.Tasks
                .Where(t => t.CompanyId == companyId)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<TaskItem>> GetForAdminAsync(
            int companyId,
            int userId)
        {
            return await _context.Tasks
                .Where(t =>
                    t.CompanyId == companyId &&
                    (t.AssignedToUserId == userId ||
                     t.CreatedByUserId == userId))
                .ToListAsync();
        }
        public async Task<IReadOnlyList<TaskItem>> GetForMemberAsync(
            int companyId,
            int userId)
        {
            return await _context.Tasks
                .Where(t =>
                    t.CompanyId == companyId &&
                    t.AssignedToUserId == userId)
                .ToListAsync();
        }

        public async Task<bool> HasHigherPriorityPendingTaskAsync(
            int assignedUserId,
            int companyId,
            TaskItemPriority priority)
        {
            return await _context.Tasks
                .AnyAsync(t =>
                    t.AssignedToUserId == assignedUserId &&
                    t.CompanyId == companyId &&
                    t.Status != TaskItemStatus.Completed &&
                    t.Priority.HasValue &&
                    (int)t.Priority.Value > (int)priority
                    );

        }
    }
}
