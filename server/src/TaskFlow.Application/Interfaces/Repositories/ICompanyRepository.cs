using TaskFlow.Domain.Entities;

namespace TaskFlow.Application.Interfaces.Repositories
{
    public interface ICompanyRepository
    {
        Task<bool> ExistsByTaxIdAsync(string taxId);

        Task<bool> ExistsByCompanyAccessCodeAsync(string companyAccessCode);

        Task AddCompanyAsync(Company company);
    }
}
