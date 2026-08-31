
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Auth;

namespace TaskFlow.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILoginUseCase _loginUseCase;
        public AuthController(ILoginUseCase loginUseCase)
        {
            _loginUseCase = loginUseCase;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _loginUseCase.ExecuteAsync(request);
            return Ok(response);
        }
    }
}
