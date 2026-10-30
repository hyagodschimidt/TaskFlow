using TaskFlow.Application.Exceptions;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Application.Interfaces.Persistence;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.Requests.Users;
using TaskFlow.Domain.Enums;
using FluentValidation;

namespace TaskFlow.Application.UseCases.AppUsers
{
    public class ChangeRoleUseCase : IChangeRoleUseCase
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly ICurrentUser _currentUser;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<ChangeAppUserRoleRequest> _validator;

        public ChangeRoleUseCase(
            IAppUserRepository appUserRepository,
            ICurrentUser currentUser,
            IUnitOfWork unitOfWork,
            IValidator<ChangeAppUserRoleRequest> validator)
        {
            _appUserRepository = appUserRepository;
            _currentUser = currentUser;
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task ExecuteAsync(int userId, ChangeAppUserRoleRequest request)
        {
            var currentUserRole = _currentUser.Role;
            if (currentUserRole != UserRole.Owner)
            {
                throw new ForbiddenException("Only owners can change user roles.");
            }

            var validationResult = await _validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                throw new ValidationException("Invalid request data", validationResult.Errors);
            }

            var user = await _appUserRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new NotFoundException($"User with ID {userId} not found.");
            }

            if (user.CompanyId != _currentUser.CompanyId)
            {
                throw new NotFoundException($"User with ID {userId} not found.");
            }

            user.ChangeRole(request.Role);

            await _unitOfWork.SaveChangesAsync();
        }
    }
}
