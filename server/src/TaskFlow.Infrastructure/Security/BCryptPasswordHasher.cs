using TaskFlow.Application.Interfaces.Security;

namespace TaskFlow.Infrastructure.Security
{
    public class BCryptPasswordHasher : IPasswordHasher
    {
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }   
    }
}
