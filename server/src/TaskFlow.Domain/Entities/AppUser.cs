namespace TaskFlow.Domain.Entities;
using TaskFlow.Domain.Enums;
using TaskFlow.Domain.Exceptions;

public class AppUser
{
    public int Id { get; private set; }
    public string UserName { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;
    public Company Company { get; private set; } = null!;
    public int CompanyId { get; private set; }
    public UserRole Role { get; private set; }

    private AppUser()
    {
    }

    public AppUser(
        string userName,
        string email,
        string passwordHash,
        Company company,
        UserRole role)
    {
        UserName = userName;
        Email = email;
        PasswordHash = passwordHash;
        Company = company;
        Role = role;
    }

    public void ChangeRole(UserRole newRole)
    {
        if (Role == UserRole.Owner)
        {
            throw new InvalidRoleTransitionException("Cannot change the role of an Owner.");
        }
        if (newRole != UserRole.Admin && newRole != UserRole.Member)
        {
            throw new DomainValidationException("Invalid role transition.");
        }
        if (Role == newRole)
        {
            throw new InvalidRoleTransitionException("The user already has this role.");
        }

        Role = newRole;
    }
}
