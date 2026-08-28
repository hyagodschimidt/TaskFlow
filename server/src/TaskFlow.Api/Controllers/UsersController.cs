using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Users;

namespace TaskFlow.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ICreateAppUserUseCase _createAppUserUseCase;
        public UsersController(ICreateAppUserUseCase createAppUserUseCase)
        {
            _createAppUserUseCase = createAppUserUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateAppUserRequest request)
        {
            var response = await _createAppUserUseCase.ExecuteAsync(request);
            return StatusCode(StatusCodes.Status201Created, response);
        }
    }
}
