using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Infrastructure.Persistence.Configurations
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasKey(company => company.Id);
            builder.Property(company => company.TaxId)
                .IsRequired()
                .HasMaxLength(30);
            builder.HasIndex(company => company.TaxId)
                .IsUnique();
            builder.Property(company => company.CompanyAccessCode)
                .IsRequired();
            builder.HasIndex(company => company.CompanyAccessCode)
                .IsUnique();
            builder.Property(company => company.Name)
                .IsRequired()
                .HasMaxLength(100);


        }

    }
}
