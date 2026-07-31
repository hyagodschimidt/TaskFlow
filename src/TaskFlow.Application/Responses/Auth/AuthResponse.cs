using TaskFlow.Application.Responses.Companies;
using TaskFlow.Application.Responses.Users;

namespace TaskFlow.Application.Responses.Auth

{
    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;

        public DateTime ExpiresAt { get; set; }
        
        public AppUserResponse User { get; set; } = new AppUserResponse();

        public CompanyResponse Company { get; set; } = new CompanyResponse();


    }
}
