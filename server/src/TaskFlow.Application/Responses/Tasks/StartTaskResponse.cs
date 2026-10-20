using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Responses.Tasks
{
    public class StartTaskResponse
    {
        public int TaskItemId { get; set; }

        public TaskItemStatus Status { get; set; }
    }
}
