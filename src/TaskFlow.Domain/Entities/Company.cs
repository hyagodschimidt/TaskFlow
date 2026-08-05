namespace TaskFlow.Domain.Entities;

using TaskFlow.Domain.Enums;

public class Company
{
    public int Id { get; private set; }

    public string TaxId { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;

    public string CompanyAccessCode { get; private set; } = string.Empty;

    public DeadlineMode DeadlineMode { get; private set; }

    public PriorityAccessPolicy PriorityAccessPolicy { get; private set; }
    private Company()
    {
    }

    public Company(string name,
        string taxId,
        DeadlineMode deadlineMode,
        PriorityAccessPolicy priorityAccessPolicy)
    {
        Name = name;    
        TaxId = taxId;
        DeadlineMode = deadlineMode;
        PriorityAccessPolicy = priorityAccessPolicy;
    }
}