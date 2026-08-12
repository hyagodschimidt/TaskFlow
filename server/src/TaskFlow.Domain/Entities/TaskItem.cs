namespace TaskFlow.Domain.Entities;

using System;
using TaskFlow.Domain.Enums;

public class TaskItem
{
    public int Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public TaskItemStatus Status { get; private set; }
    public TaskItemPriority? Priority { get; private set; }
    public int CreatedByUserId { get; private set; }
    public AppUser CreatedByUser { get; private set; } = null!;
    public DateTime CreatedAt { get; private set; }
    public int AssignedToUserId { get; private set; }
    public AppUser AssignedToUser { get; private set; } = null!;
    public DateTime? DueDate { get; private set; }
    public int CompanyId { get; private set; }
    public Company Company { get; private set; } = null!;
    public string? CompletionReport { get; private set; }
    public DateTime? CompletedAt { get; private set; }

    private TaskItem()
    {
    }

    public TaskItem(
        string title,
        string description,
        AppUser assignedToUser,
        AppUser createdByUser,
        Company company,
        TaskItemPriority? priority = null,
        DateTime? dueDate = null)
    {
        Title = title;
        Description = description;
        Company = company;
        AssignedToUser = assignedToUser;
        CreatedByUser = createdByUser;
        Priority = priority;
        DueDate = dueDate;
        Status = TaskItemStatus.ToDo;
        CreatedAt = DateTime.UtcNow;
    }

    public void Start()
    {
        if (Status != TaskItemStatus.ToDo)
        {
            throw new InvalidOperationException("Task can only be started if it is in 'To Do' status.");
        }
        Status = TaskItemStatus.InProgress;
    }

    public void Complete(string report)
    {
        if (string.IsNullOrWhiteSpace(report))
        {
            throw new ArgumentException("Completion report cannot be null or empty.", nameof(report));
        }
        if (Status == TaskItemStatus.Completed)
        {
            throw new InvalidOperationException("Task is already completed.");
        }
        if (Status != TaskItemStatus.InProgress)
        {
            throw new InvalidOperationException("Task can only be completed if it is in 'In Progress' status.");
        }
        Status = TaskItemStatus.Completed;
        CompletionReport = report;
        CompletedAt = DateTime.UtcNow;
    }
}
