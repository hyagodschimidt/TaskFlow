using TaskFlow.Application.Responses.Users;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface IGetAppUsersUseCase
    {
        Task<IReadOnlyList<AppUserResponse>> ExecuteAsync();
    }
}
