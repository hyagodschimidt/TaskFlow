using Microsoft.EntityFrameworkCore;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Domain.Entities;
using TaskFlow.Infrastructure.Persistence;

namespace TaskFlow.Infrastructure.Persistence.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly AppDbContext _context;

        public AppUserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _context.AppUsers.AnyAsync(u => u.Email == email);
        }

        public async Task AddAppUserAsync(AppUser appUser)
        {
            await _context.AppUsers.AddAsync(appUser);
            
        }

        public async Task<AppUser?> GetByEmailAsync(string email)
        {
            return  await _context.AppUsers.FirstOrDefaultAsync(u => u.Email == email);

        }

        public async Task<int?> GetCompanyIdByUserId(int userId)
        {
            var companyId = await _context.AppUsers
                .Where(u => u.Id == userId)
                .Select(u => (int?)u.CompanyId)
                .FirstOrDefaultAsync();
            return companyId;
        }
    }
}
