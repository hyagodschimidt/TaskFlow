using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Requests.Companies
{
    public class CreateCompanyRequest
    {
        public string CompanyName { get; set; } = string.Empty;
        public string TaxId { get; set; } = string.Empty;
        public DeadlineMode DeadlineMode { get; set; }
        public PriorityAccessPolicy PriorityAccessPolicy { get; set;  }
        public string OwnerName { get; set; } = string.Empty;
        public string OwnerEmail { get; set; } = string.Empty;
        public string OwnerPassword { get; set; } = string.Empty;

    }
}
