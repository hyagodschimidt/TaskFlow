using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> ExistsByTaxIdAsync(string taxId)
        {
            return await _context.Companies.AnyAsync(c => c.TaxId == taxId);
        }

        public async Task<bool> ExistsByCompanyAccessCodeAsync(string companyAccessCode)
        {
            return await _context.Companies.AnyAsync(c => c.CompanyAccessCode == companyAccessCode);
        }

        public async Task AddCompanyAsync(Company company)
        {
            await _context.Companies.AddAsync(company);
        }

        public async Task<Company?> GetByIdAsync(int id)
        {
            return await _context.Companies.FindAsync(id);
        }
    }
}
