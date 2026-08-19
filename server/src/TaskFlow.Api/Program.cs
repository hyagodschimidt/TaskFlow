using Microsoft.IdentityModel.Tokens;
using TaskFlow.Application.Interfaces.Security;
using TaskFlow.Infrastructure.Security;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

var jwtkey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT key is not configured.");

builder.Services.AddOpenApi();
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtkey)),
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateIssuer = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateAudience = true,
            ValidateLifetime = true,
        };
    });
builder.Services.AddAuthorization();
builder.Services.Configure<JwtSettings>
    (builder.Configuration.GetSection("Jwt"));

builder.Services.AddScoped<ITokenGenerator, JwtTokenGenerator>();
builder.Services.AddScoped<IPasswordHasher, BCryptPasswordHasher>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.Run();


