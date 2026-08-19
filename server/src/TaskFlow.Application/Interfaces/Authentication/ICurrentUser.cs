using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Interfaces.Authentication
{
    public interface ICurrentUser
    {
        int UserId { get; }
        int CompanyId { get; }
        UserRole Role { get; }

    }
}
