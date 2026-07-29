namespace TaskFlow.Application.Requests.Auth
{
    public class LoginRequest
    {
        public string UserName { get; set; } = string.Empty;

        public string Password {  get; set; } = string.Empty;
    }
}
