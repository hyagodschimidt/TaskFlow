using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Responses.Tasks
{
    public class TaskItemResponse
    {
        public int Id { get;  set; }
        public string Title { get;  set; } = string.Empty;
        public string Description { get;  set; } = string.Empty;
        public int AssignedToUserId { get; set; }
        public int CreatedByUserId { get;  set; }
        public TaskItemStatus Status { get;  set; }
        public TaskItemPriority? Priority { get;  set; }
        public DateTime CreatedAt { get;  set; }
        public DateTime? DueDate { get;  set; }
        public string? CompletionReport { get;  set; }
        public DateTime? CompletedAt { get;  set; }
    }
}
