using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Infrastructure.Persistence.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly AppDbContext _context;

        public CompanyRepository(AppDbContext context)
        {
            _context = context;
        }

        public Task<bool> ExistsByTaxIdAsync(string taxId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistsByCompanyAccessCodeAsync(string companyAccessCode)
        {
            throw new NotImplementedException();
        }

        public Task AddCompanyAsync(Company company)
        {
            throw new NotImplementedException();
        }

        public async Task<Company?> GetByIdAsync(int id)
        {
            return await _context.Companies.FindAsync(id);
        }
    }
}
