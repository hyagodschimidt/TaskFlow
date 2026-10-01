using TaskFlow.Application.Responses.Tasks;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface IGetTaskItemByIdUseCase
    {
        Task<TaskItemResponse> ExecuteAsync(int taskItemId);
    }
}
