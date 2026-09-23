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
        public TasksController(ICreateTaskItemUseCase createTaskItemUseCase)
        {
            _createTaskItemUseCase = createTaskItemUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTaskItem([FromBody] CreateTaskItemRequest request)
        {
            var response = await _createTaskItemUseCase.ExecuteAsync(request);
            return StatusCode(StatusCodes.Status201Created, response);
        }
    }
}
