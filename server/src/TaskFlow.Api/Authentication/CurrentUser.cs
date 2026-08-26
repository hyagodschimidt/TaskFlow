using System.Security.Claims;
using TaskFlow.Api.Exceptions;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Api.Authentication
{
    public class CurrentUser : ICurrentUser
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CurrentUser(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int UserId
        {
            get
            {
                var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
                if(!int.TryParse(userIdClaim?.Value, out var userId))
                {
                    throw new InvalidCurrentUserException("UserId claim is missing or invalid");
                }
                return userId;
            }
        }
        public int CompanyId
        {
            get
            {
                var companyIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst("CompanyId");
                if (!int.TryParse(companyIdClaim?.Value, out var companyId))
                {
                    throw new InvalidCurrentUserException("CompanyId claim is missing or invalid");
                }
                return companyId;
            }
        }

        public UserRole Role
        {
            get
            {
                var roleClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Role);
                if (!Enum.TryParse<UserRole>(roleClaim?.Value, out var role) || !Enum.IsDefined<UserRole>(role))
                {
                    throw new InvalidCurrentUserException("Role claim is missing or invalid");
                }
                return role;
            }
        }
    }
}
