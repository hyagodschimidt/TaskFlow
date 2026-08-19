using FluentValidation;
using TaskFlow.Application.Constants;
using TaskFlow.Application.Requests.Users;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Validators.Users
{
    public class CreateAppUserRequestValidator : AbstractValidator<CreateAppUserRequest>
    {
        public CreateAppUserRequestValidator() 
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage(ValidationMessages.RequiredName);

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage(ValidationMessages.RequiredEmail)
                .EmailAddress().WithMessage(ValidationMessages.InvalidEmail);

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage(ValidationMessages.RequiredPassword)
                .MinimumLength(6).WithMessage(ValidationMessages.PasswordMinLength)
                .Must(p => p.Any(char.IsUpper)).WithMessage(ValidationMessages.PasswordMustContainUppercase)
                .Must(p => p.Any(char.IsLower)).WithMessage(ValidationMessages.PasswordMustContainLowercase)
                .Must(p => p.Any(char.IsDigit)).WithMessage(ValidationMessages.PasswordMustContainNumber);
        
            RuleFor(x => x.Role)
                .Must(role => role == UserRole.Admin || role == UserRole.Member).WithMessage(ValidationMessages.InvalidUserRoleForCreation);
        }
    }
}
