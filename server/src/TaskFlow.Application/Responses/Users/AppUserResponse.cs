using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Responses.Users
{
    public class AppUserResponse
    {
        public string UserName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public int Id { get; set; }

        public UserRole Role { get; set; }
    }
}
