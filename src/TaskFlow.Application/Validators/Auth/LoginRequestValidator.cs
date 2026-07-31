using FluentValidation;
using TaskFlow.Application.Constants;
using TaskFlow.Application.Requests.Auth;

namespace TaskFlow.Application.Validators.Auth
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator() 
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage(ValidationMessages.RequiredEmail)
                .EmailAddress().WithMessage(ValidationMessages.InvalidEmail);

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage(ValidationMessages.RequiredPassword);
                

        }
    }
}
