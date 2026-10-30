using TaskFlow.Application.Requests.Users;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface IChangeRoleUseCase
    {
        Task ExecuteAsync(int userId, ChangeAppUserRoleRequest request);
    }
}
