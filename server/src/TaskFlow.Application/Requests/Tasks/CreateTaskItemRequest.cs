using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Requests.Tasks
{
    public class CreateTaskItemRequest
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int AssignedToUserId { get; set; }

        public TaskItemPriority? Priority { get; set; }

        public DateTime? DueDate { get; set; } 
    }
    
}
