using TaskFlow.Domain.Entities;

namespace TaskFlow.Application.Interfaces.Repositories
{
    public interface IAppUserRepository
    {
        public Task<bool> ExistsByEmailAsync(string email);
        public Task AddAppUserAsync(AppUser appUser);
        Task<AppUser?> GetByEmailAsync(string email);
        Task<int?> GetCompanyIdByUserId(int userId);
        Task<AppUser?> GetByIdAsync(int id);
        Task<IReadOnlyList<AppUser>> GetMembersByCompanyIdAsync(int companyId);
        Task<IReadOnlyList<AppUser>> GetByCompanyIdAsync(int companyId);

    }
}
