using Microsoft.Extensions.Options;
using System.Security.Claims;
using TaskFlow.Application.Interfaces.Security;
using TaskFlow.Domain.Enums;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
namespace TaskFlow.Infrastructure.Security
{
    public class JwtTokenGenerator(IOptions<JwtSettings> options) : ITokenGenerator
    {
        private readonly JwtSettings _settings = options.Value;
       
        private List<Claim> GetClaims(int userId, int companyId, UserRole role)
        {
            return new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim("CompanyId", companyId.ToString()),
                new Claim(ClaimTypes.Role, role.ToString())
            };
        }
        
        public string GenerateToken(int userId, int companyId, UserRole role)
        {
            var claims = GetClaims(userId, companyId, role);
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _settings.Issuer,
                audience: _settings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_settings.ExpiresMinutes),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
