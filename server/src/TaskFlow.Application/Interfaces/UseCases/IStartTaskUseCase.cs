using TaskFlow.Application.Responses.Tasks;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface IStartTaskUseCase
    {
        Task<StartTaskResponse> ExecuteAsync(int taskItemId);
    }
}
