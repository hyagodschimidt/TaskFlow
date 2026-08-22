using TaskFlow.Domain.Entities;

namespace TaskFlow.Application.Interfaces.Repositories
{
    public interface IAppUserRepository
    {
        public Task<bool> ExistsByEmailAsync(string email);

        public Task AddAppUserAsync(AppUser appUser);

        Task<AppUser?> GetByEmailAsync(string email);
    }
}
