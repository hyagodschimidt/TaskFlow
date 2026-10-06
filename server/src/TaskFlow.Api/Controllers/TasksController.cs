using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Tasks;

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
        public TasksController(ICreateTaskItemUseCase createTaskItemUseCase,
            IGetTaskItemByIdUseCase getTaskItemByIdUseCase,
            IGetTaskItemsUseCase getTaskItemsUseCase)
        {
            _createTaskItemUseCase = createTaskItemUseCase;
            _getTaskItemByIdUseCase = getTaskItemByIdUseCase;
            _getTaskItemsUseCase = getTaskItemsUseCase;
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

    }
}
