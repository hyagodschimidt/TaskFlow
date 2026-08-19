using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Interfaces.Security
{
    public interface ITokenGenerator
    {
        string GenerateToken(int userId, int companyId, UserRole role);
    }
}
