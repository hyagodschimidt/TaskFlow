using TaskFlow.Application.Exceptions;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Responses.Users;
using TaskFlow.Domain.Enums;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Application.UseCases.AppUsers
{
    public class GetAppUsersUseCase : IGetAppUsersUseCase
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly ICurrentUser _currentUser;

        public GetAppUsersUseCase(
            IAppUserRepository appUserRepository,
            ICurrentUser currentUser)
        {
            _appUserRepository = appUserRepository;
            _currentUser = currentUser;
        }

        public async Task<IReadOnlyList<AppUserResponse>> ExecuteAsync()
        {
            var companyId = _currentUser.CompanyId;
            var role = _currentUser.Role;
            IReadOnlyList<AppUser> users;

            if (role == UserRole.Admin)
            {
                users = await _appUserRepository.GetMembersByCompanyIdAsync(companyId);
            }
            else if (role == UserRole.Owner)
            {
                users = await _appUserRepository.GetByCompanyIdAsync(companyId);
            }
            else
            {
                throw new ForbiddenException("You do not have permission to access this resource.");
            }

            var response = users.Select(u => new AppUserResponse
            {
                Id = u.Id,
                UserName = u.UserName,
                Email = u.Email,
                Role = u.Role
            }).ToList();

            return response;
        }
    }
}