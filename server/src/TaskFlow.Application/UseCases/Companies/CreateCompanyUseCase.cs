using System.Security.Cryptography;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.Security;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Companies;
using TaskFlow.Application.Responses.Companies;
using TaskFlow.Domain.Enums;
using TaskFlow.Domain.Entities;
using TaskFlow.Application.Interfaces.Persistence;
using FluentValidation;

namespace TaskFlow.Application.UseCases.Companies
{
    public class CreateCompanyUseCase : ICreateCompanyUseCase
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<CreateCompanyRequest> _validator;
        public CreateCompanyUseCase(
            IAppUserRepository appUserRepository,
            ICompanyRepository companyRepository,
            IPasswordHasher passwordHasher,
            IUnitOfWork unitOfWork,
            IValidator<CreateCompanyRequest> validator)
        {
            _companyRepository = companyRepository;
            _appUserRepository = appUserRepository;
            _passwordHasher = passwordHasher;
            _unitOfWork = unitOfWork ;
            _validator = validator;
        }

        public async Task<CompanyResponse> ExecuteAsync(CreateCompanyRequest request)
        {
            var result = await _validator.ValidateAsync(request);
            if (!result.IsValid) {
                throw new ValidationException("Invalid request", result.Errors);
            }

            string companyAccessCode;
            bool existsCompanyAccessCode; 

            var existsByTaxId = await _companyRepository.ExistsByTaxIdAsync(request.TaxId);
            if (existsByTaxId)
            {
                throw new Exception("Tax Id already exists");
            }
            var existsByEmail = await _appUserRepository.ExistsByEmailAsync(request.OwnerEmail);
            if (existsByEmail)
            {
                throw new Exception("Email already exists");
            }

            do
            {
                companyAccessCode = RandomNumberGenerator
                    .GetInt32(10000, 100000)
                    .ToString();

                existsCompanyAccessCode = await _companyRepository.ExistsByCompanyAccessCodeAsync(companyAccessCode);
            }
            while (existsCompanyAccessCode);

            var passwordHash = _passwordHasher.HashPassword(request.OwnerPassword);

            var company = new Company(
                name: request.CompanyName,
                taxId: request.TaxId,
                companyAccessCode: companyAccessCode,
                priorityAccessPolicy: request.PriorityAccessPolicy,
                deadlineMode: request.DeadlineMode
            );

            var owner = new AppUser(
                userName: request.OwnerName,
                email: request.OwnerEmail,
                passwordHash: passwordHash,
                company: company,
                role: UserRole.Owner
                );

            await _companyRepository.AddCompanyAsync(company);
            await _appUserRepository.AddAppUserAsync(owner);

            await _unitOfWork.SaveChangesAsync();

            return new CompanyResponse
            {
                Id = company.Id,
                Name = company.Name,
                TaxId = company.TaxId,
                CompanyAccessCode = company.CompanyAccessCode,
                PriorityAccessPolicy = company.PriorityAccessPolicy,
                DeadlineMode = company.DeadlineMode
            };


        }
    }
}



