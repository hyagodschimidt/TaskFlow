using TaskFlow.Domain.Enums;
namespace TaskFlow.Application.Requests.Users
{
    
    public class CreateAppUserRequest
    {
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public UserRole Role { get; set;  }
    }
}
