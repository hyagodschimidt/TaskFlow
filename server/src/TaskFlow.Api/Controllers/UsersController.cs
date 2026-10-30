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
        private readonly IGetAppUsersUseCase _getAppUsersUseCase;
        private readonly IChangeRoleUseCase _changeRoleUseCase;
        public UsersController(
            ICreateAppUserUseCase createAppUserUseCase,
            IGetAppUsersUseCase getAppUsersUseCase,
            IChangeRoleUseCase changeRoleUseCase)
        {
            _createAppUserUseCase = createAppUserUseCase;
            _getAppUsersUseCase = getAppUsersUseCase;
            _changeRoleUseCase = changeRoleUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateAppUserRequest request)
        {
            var response = await _createAppUserUseCase.ExecuteAsync(request);
            return StatusCode(StatusCodes.Status201Created, response);
        }

        [Authorize(Roles = "Owner,Admin")]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var response = await _getAppUsersUseCase.ExecuteAsync();
            return Ok(response);
        }

        [Authorize(Roles = "Owner")]
        [HttpPatch("{userId:int}/role")]
        public async Task<IActionResult> ChangeRole([FromRoute] int userId, [FromBody] ChangeAppUserRoleRequest request)
        {
            await _changeRoleUseCase.ExecuteAsync(userId, request);
            return NoContent();
        }
    }
}
