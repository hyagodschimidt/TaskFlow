using TaskFlow.Application.Responses.Tasks;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface IGetTaskItemsUseCase
    {
        public Task<IReadOnlyList<TaskItemResponse>> ExecuteAsync();
    }
}
