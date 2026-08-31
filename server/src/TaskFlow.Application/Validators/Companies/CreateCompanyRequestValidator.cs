using FluentValidation;
using TaskFlow.Application.Constants;
using TaskFlow.Application.Requests.Companies;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Validators.Companies
{
    public class CreateCompanyRequestValidator : AbstractValidator<CreateCompanyRequest>
    {
        public CreateCompanyRequestValidator() 
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.CompanyName)
                .NotEmpty().WithMessage(ValidationMessages.RequiredCompanyName)
                .MaximumLength(100).WithMessage("Company name must not exceed 100 characters.");

            RuleFor(x => x.TaxId)
                .NotEmpty().WithMessage(ValidationMessages.RequiredTaxId)
                .MinimumLength(5).WithMessage(ValidationMessages.TaxIdMinLength)
                .MaximumLength(30).WithMessage(ValidationMessages.TaxIdMaxLength)
                .Must(p => p.All(char.IsLetterOrDigit)).WithMessage(ValidationMessages.InvalidTaxId);

            RuleFor(x => x.PriorityAccessPolicy)
                .IsInEnum().WithMessage(ValidationMessages.InvalidEnum<PriorityAccessPolicy>("Priority access Policy"));

            RuleFor(x => x.DeadlineMode)
                .IsInEnum().WithMessage(ValidationMessages.InvalidEnum<DeadlineMode>("Dead line mode"));

            RuleFor(x => x.OwnerName)
                .NotEmpty().WithMessage(ValidationMessages.RequiredName);

            RuleFor(x => x.OwnerEmail)
                .NotEmpty().WithMessage(ValidationMessages.RequiredEmail)
                .EmailAddress().WithMessage(ValidationMessages.InvalidEmail);

            RuleFor(x => x.OwnerPassword)
                .NotEmpty().WithMessage(ValidationMessages.RequiredPassword)
                .MinimumLength(6).WithMessage(ValidationMessages.PasswordMinLength)
                .Must(p => p.Any(char.IsUpper)).WithMessage(ValidationMessages.PasswordMustContainUppercase)
                .Must(p => p.Any(char.IsLower)).WithMessage(ValidationMessages.PasswordMustContainLowercase)
                .Must(p => p.Any(char.IsDigit)).WithMessage(ValidationMessages.PasswordMustContainNumber);

        }
    }
}
