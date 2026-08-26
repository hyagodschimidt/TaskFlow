using FluentValidation;
using TaskFlow.Application.Exceptions;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.Security;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Auth;
using TaskFlow.Application.Responses.Auth;

namespace TaskFlow.Application.UseCases.Authentication
{
    public class LoginUseCase : ILoginUseCase
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly IValidator<LoginRequest> _validator;
        private readonly IPasswordHasher _passwordHasher;
        public LoginUseCase(IAppUserRepository appUserRepository, ITokenGenerator tokenGenerator, IPasswordHasher passwordHasher, IValidator<LoginRequest> validator)
        {
            _validator = validator;
            _appUserRepository = appUserRepository;
            _tokenGenerator = tokenGenerator;
            _passwordHasher = passwordHasher;
        }
        public async Task<AuthResponse> ExecuteAsync(LoginRequest request)
        {
            var result = await _validator.ValidateAsync(request);

            if (!result.IsValid)
            {
                throw new ValidationException(result.Errors);
            }

            var user = await _appUserRepository.GetByEmailAsync(request.Email);

            if (user == null)
            {
                throw new InvalidCredentialsException("Email or password is invalid");
            }

            bool isPasswordValid =  _passwordHasher.VerifyPassword(request.Password, user.PasswordHash);

            if (!isPasswordValid)
            {
                throw new InvalidCredentialsException("Email or password is invalid");
            }

            var token = _tokenGenerator.GenerateToken(user.Id, user.CompanyId, user.Role);

            return new AuthResponse { Token = token };
        }
    }
}
