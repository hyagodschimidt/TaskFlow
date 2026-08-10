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

            RuleFor(x => x.Report)
                .NotEmpty().WithMessage(ValidationMessages.RequiredCompletionReport)
                .MinimumLength(30).WithMessage(ValidationMessages.ReportMinLenght)
                .MaximumLength(2000).WithMessage(ValidationMessages.ReportMaxLenght);
        }
    }
}
