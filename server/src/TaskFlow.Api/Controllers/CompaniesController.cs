using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Companies;

namespace TaskFlow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class CompaniesController : ControllerBase
    {
        private readonly ICreateCompanyUseCase _createCompanyUseCase;
        public CompaniesController(ICreateCompanyUseCase createCompanyUseCase)
        {
            _createCompanyUseCase = createCompanyUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] CreateCompanyRequest request)
        {
            var response = await _createCompanyUseCase.ExecuteAsync(request);
            return (StatusCode(StatusCodes.Status201Created, response));
        }
    }
}
