using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Responses.Companies
{
    public class CompanyResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string TaxId { get; set; } = string.Empty;
        public PriorityAccessPolicy PriorityAccessPolicy { get; set; }
        public DeadlineMode DeadlineMode { get; set; }

    }
}
