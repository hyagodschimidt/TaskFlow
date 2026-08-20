using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Enums;
namespace TaskFlow.Application.Requests.Users
{
    
    public class CreateAppUserRequest
    {
        public string UserName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public Company? Company { get; internal set; }
    }
}
