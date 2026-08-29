using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Infrastructure.Persistence.Configurations
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.HasKey(user => user.Id);
            builder.HasOne(user => user.Company)
                .WithMany()
                .HasForeignKey(user => user.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Property(user => user.UserName)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(user => user.Email)
                .IsRequired()
                .HasMaxLength(150);
            builder.HasIndex(user => user.Email)
                .IsUnique();
            builder.Property(user => user.PasswordHash)
                .IsRequired()
                .HasMaxLength(200);
        }
        
    }
}
