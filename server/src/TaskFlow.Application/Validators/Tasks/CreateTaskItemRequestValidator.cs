using FluentValidation;
using TaskFlow.Application.Constants;
using TaskFlow.Application.Requests.Tasks;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Validators.Tasks
{
    public class CreateTaskItemRequestValidator : AbstractValidator<CreateTaskItemRequest>
    {
        public CreateTaskItemRequestValidator()
        {
            RuleLevelCascadeMode = CascadeMode.Stop;
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage(ValidationMessages.RequiredTitle)
                .MaximumLength(100).WithMessage(ValidationMessages.TitleMaxLength)
                .MinimumLength(5).WithMessage(ValidationMessages.TitleMinLength);

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage(ValidationMessages.RequiredDescription)
                .MinimumLength(25).WithMessage(ValidationMessages.DescriptionMinLength)
                .MaximumLength(2000).WithMessage(ValidationMessages.DescriptionMaxLength);

            RuleFor(x => x.AssignedToUserId)
                .GreaterThan(0).WithMessage(ValidationMessages.RequiredUser);

            RuleFor(x => x.Priority)        
                .IsInEnum().WithMessage(ValidationMessages.InvalidEnum<TaskItemPriority>("Priority"));
            
            RuleFor(x => x.DueDate)
                .Must(dueDate => dueDate == null || dueDate > DateTime.UtcNow)
                .WithMessage(ValidationMessages.FutureDueDate);
        }
    }
}
