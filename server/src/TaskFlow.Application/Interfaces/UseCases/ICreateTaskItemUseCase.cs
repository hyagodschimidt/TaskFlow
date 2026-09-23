using TaskFlow.Application.Requests.Tasks;
using TaskFlow.Application.Responses.Tasks;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface ICreateTaskItemUseCase
    {
        public Task<TaskItemResponse> ExecuteAsync(CreateTaskItemRequest request);

    }
}
