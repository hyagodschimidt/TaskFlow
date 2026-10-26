using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Responses.Tasks
{
    public class CompleteTaskItemResponse
    {
        public int TaskItemId { get; set; }
        public TaskItemStatus Status { get; set; }
        public DateTime CompletedAt { get; set; }
    }
}
