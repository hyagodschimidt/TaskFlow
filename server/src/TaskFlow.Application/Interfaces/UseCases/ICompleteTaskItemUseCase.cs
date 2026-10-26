using TaskFlow.Application.Requests.Tasks;
using TaskFlow.Application.Responses.Tasks;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface ICompleteTaskItemUseCase
    {
        Task<CompleteTaskItemResponse> ExecuteAsync(int taskItemId, CompleteTaskItemRequest request );
    }
}