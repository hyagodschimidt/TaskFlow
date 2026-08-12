using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Infrastructure.Persistence.Configurations
{
    public class TaskItemConfiguration :IEntityTypeConfiguration<TaskItem>
    {
        public void Configure(EntityTypeBuilder<TaskItem> builder)
        {
            builder.HasKey(taskItem => taskItem.Id);
            builder.HasOne(taskItem => taskItem.AssignedToUser)
                .WithMany()
                .HasForeignKey(taskItem => taskItem.AssignedToUserId);
            builder.HasOne(taskItem => taskItem.CreatedByUser)
                .WithMany()
                .HasForeignKey(taskItem => taskItem.CreatedByUserId);
            builder.HasOne(taskItem => taskItem.Company)
                .WithMany()
                .HasForeignKey(taskItem => taskItem.CompanyId);
            builder.Property(taskItem => taskItem.Title)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(taskItem => taskItem.Description)
                .IsRequired()
                .HasMaxLength(1000);
            builder.Property(taskItem => taskItem.CompletionReport)
                .HasMaxLength(1000);
        }
    }
    
}
