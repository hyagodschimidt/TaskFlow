using TaskFlow.Application.Requests.Companies;
using TaskFlow.Application.Responses.Companies;

namespace TaskFlow.Application.Interfaces.UseCases
{
    public interface ICreateCompanyUseCase
    {
        Task<CompanyResponse> ExecuteAsync(CreateCompanyRequest request);
    }
}
