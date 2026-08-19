using TaskFlow.Application.Requests.Users;
using TaskFlow.Application.Responses.Users;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface ICreateAppUserUseCase
    {
        Task<AppUserResponse> ExecuteAsync(CreateAppUserRequest request);
    }
}
