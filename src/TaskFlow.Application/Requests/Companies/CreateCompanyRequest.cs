using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Requests.Companies
{
    public class CreateCompanyRequest
    {
        public string Name { get; set; } = string.Empty;

        public DeadlineMode DeadlineMode { get; set; }

        public PriorityAccessPolicy PriorityAccessPolicy { get; set;  }
    }
}
