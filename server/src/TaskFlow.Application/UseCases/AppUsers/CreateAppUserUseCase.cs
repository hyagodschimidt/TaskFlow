using FluentValidation;
using TaskFlow.Application.Exceptions;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Application.Interfaces.Persistence;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.Security;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Users;
using TaskFlow.Application.Responses.Users;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.UseCases.AppUsers
{
    public class CreateAppUserUseCase : ICreateAppUserUseCase
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IValidator<CreateAppUserRequest> _validator;
        private readonly IAppUserRepository _appUserRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ICurrentUser _currentUser;

        public CreateAppUserUseCase(
            ICurrentUser currentUser,
            ICompanyRepository companyRepository,
            IValidator<CreateAppUserRequest> validator,
            IAppUserRepository appUserRepository,
            IUnitOfWork unitOfWork,
            IPasswordHasher passwordHasher)

        {
            _currentUser = currentUser;
            _companyRepository = companyRepository;
            _validator = validator;
            _appUserRepository = appUserRepository;
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
        }

        public async Task<AppUserResponse> ExecuteAsync(CreateAppUserRequest request)
        {

            if (_currentUser.Role != UserRole.Owner)
            {
                throw new ForbiddenException("You do not have permission to create a user");
            }

            var result = await _validator.ValidateAsync(request);

            if (!result.IsValid)
            {
                throw new ValidationException("Invalid request data", result.Errors);
            }
            var existsByEmail = await _appUserRepository.ExistsByEmailAsync(request.Email);

            if (existsByEmail)
            {
                throw new ConflictException("Email already exists");
            }

            var company = await _companyRepository.GetByIdAsync(_currentUser.CompanyId);

            if (company == null)
            {
                throw new NotFoundException("Company not found");
            }

            var passwordHash = _passwordHasher.HashPassword(request.Password);

            var appUser = new AppUser(
                userName: request.UserName,
                email: request.Email,
                passwordHash: passwordHash,
                role: UserRole.Member,
                company: company

            );

            await _appUserRepository.AddAppUserAsync(appUser);

            await _unitOfWork.SaveChangesAsync();

            return new AppUserResponse
            {
                UserName = appUser.UserName,
                Email = appUser.Email,
                Id = appUser.Id,
                Role = appUser.Role
            };
        }
    }
}
