namespace TaskFlow.Domain.Entities;

using TaskFlow.Domain.Enums;

public class Company
{
    public int Id { get; private set; }

    public string Name { get; private set; } = string.Empty;

    public DeadlineMode DeadlineMode { get; private set; }

    public PriorityAccessPolicy PriorityAccessPolicy { get; private set; }

    private Company()
    {
    }

    public Company(string name, DeadlineMode deadlineMode, PriorityAccessPolicy priorityAccessPolicy)
    {
        Name = name;                
        DeadlineMode = deadlineMode;
        PriorityAccessPolicy = priorityAccessPolicy;
    }
}