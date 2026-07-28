using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Requests.Tasks
{
    public class CreateAppTaskRequest
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int AssignetToUserId { get; set; }

        public TaskItemPriority? Priority { get; set; }

        public DateTime? DueDate { get; set; } 
    }
    
}
