using FluentValidation;
using TaskFlow.Application.Constants;
using TaskFlow.Application.Requests.Users;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Validators.Users
{
    public class ChangeAppUserRoleRequestValidator : AbstractValidator<ChangeAppUserRoleRequest>
    {
        public ChangeAppUserRoleRequestValidator()
        {
            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(x => x.Role)
                .Must(role => role == UserRole.Admin || role == UserRole.Member)
                .WithMessage(ValidationMessages.UserRoleMustBeAdminOrMember);
        }
    }
}
