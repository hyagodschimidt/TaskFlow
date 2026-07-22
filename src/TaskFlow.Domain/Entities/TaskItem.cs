namespace TaskFlow.Domain.Entities;

using System;

public class TaskItem
{
    public int Id { get; private set; }

    public string Title { get; private set; }

    public string Description { get; private set; } = string.Empty;

    public TaskItemStatus Status { get; private set; }

    public TaskItemPriority? Priority { get; private set; }

    public int AssignedToUserId { get; private set; }

    public int CompanyId { get; private set; }

    public string? CompletionReport { get; private set; }

    public DateTime? CompletedAt { get; private set; }
    
    private TaskItem()
    {
    }

    public TaskItem(
        string title,
        string description,
        int companyId,
        int assignedToUserId,
        TaskItemPriority? priority = null)
    {
        Title = title;
        Description = description;
        CompanyId = companyId;
        AssignedToUserId = assignedToUserId;
        Priority = priority;
        Status = TaskItemStatus.ToDo;
    }

}
