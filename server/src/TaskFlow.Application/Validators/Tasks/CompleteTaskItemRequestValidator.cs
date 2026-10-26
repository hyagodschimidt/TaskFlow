using FluentValidation;
using TaskFlow.Application.Constants;
using TaskFlow.Application.Requests.Tasks;

namespace TaskFlow.Application.Validators.Tasks
{
    public class CompleteTaskItemRequestValidator : AbstractValidator<CompleteTaskItemRequest>
    {
        public CompleteTaskItemRequestValidator()

        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.CompletionReport)
                .NotEmpty().WithMessage(ValidationMessages.RequiredCompletionReport)
                .MinimumLength(30).WithMessage(ValidationMessages.ReportMinLength)
                .MaximumLength(2000).WithMessage(ValidationMessages.ReportMaxLength);
        }
    }
}
