using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Tasks;
using TaskFlow.Application.Responses.Tasks;

namespace TaskFlow.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ICreateTaskItemUseCase _createTaskItemUseCase;
        private readonly IGetTaskItemByIdUseCase _getTaskItemByIdUseCase;
        private readonly IGetTaskItemsUseCase _getTaskItemsUseCase;
        private readonly IStartTaskUseCase _startTaskUseCase;
        private readonly ICompleteTaskItemUseCase _completeTaskItemUseCase;
        public TasksController(
            ICreateTaskItemUseCase createTaskItemUseCase,
            IGetTaskItemByIdUseCase getTaskItemByIdUseCase,
            IGetTaskItemsUseCase getTaskItemsUseCase,
            IStartTaskUseCase startTaskUseCase,
            ICompleteTaskItemUseCase completeTaskItemUseCase)
        {
            _createTaskItemUseCase = createTaskItemUseCase;
            _getTaskItemByIdUseCase = getTaskItemByIdUseCase;
            _getTaskItemsUseCase = getTaskItemsUseCase;
            _startTaskUseCase = startTaskUseCase;
            _completeTaskItemUseCase = completeTaskItemUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTaskItem([FromBody] CreateTaskItemRequest request)
        {
            var response = await _createTaskItemUseCase.ExecuteAsync(request);
            return StatusCode(StatusCodes.Status201Created, response);
        }

        [HttpGet("{taskItemId:int}")]
        public async Task<IActionResult> GetTaskItemById(int taskItemId)
        {
            var response = await _getTaskItemByIdUseCase.ExecuteAsync(taskItemId);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetTaskItems()
        {
            var response = await _getTaskItemsUseCase.ExecuteAsync();
            return Ok(response);
        }

        [HttpPost("{taskItemId:int}/start")]
        public async Task<ActionResult<StartTaskResponse>> StartTask(int taskItemId)
        {
            var response = await _startTaskUseCase.ExecuteAsync(taskItemId);
            return Ok(response);
        }

        [HttpPost("{taskItemId:int}/complete")]
        public async Task<ActionResult<CompleteTaskItemResponse>> CompleteTask(
            int taskItemId,
            [FromBody] CompleteTaskItemRequest request)
        {
            var response = await _completeTaskItemUseCase.ExecuteAsync(taskItemId, request);
            return Ok(response);
        }
    }
}
