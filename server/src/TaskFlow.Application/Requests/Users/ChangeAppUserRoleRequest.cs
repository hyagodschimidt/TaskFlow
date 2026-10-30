using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Requests.Users
{
    public class ChangeAppUserRoleRequest
    {
        public UserRole Role { get; set; }
    }
}
