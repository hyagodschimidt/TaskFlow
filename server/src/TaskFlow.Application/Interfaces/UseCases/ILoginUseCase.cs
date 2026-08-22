using TaskFlow.Application.Requests.Auth;
using TaskFlow.Application.Responses.Auth;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface ILoginUseCase
    {
        public Task<AuthResponse> ExecuteAsync(LoginRequest request);
    }
}
