using Microsoft.IdentityModel.Tokens;
using TaskFlow.Application.Interfaces.Security;
using TaskFlow.Infrastructure.Security;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using TaskFlow.Application.Interfaces.Authentication;
using TaskFlow.Api.Authentication;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Infrastructure.Persistence.Repositories;
using TaskFlow.Application.Validators.Users;
using TaskFlow.Application.Interfaces.Persistence;
using TaskFlow.Infrastructure.Persistence;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Middlewares;
using TaskFlow.Application.Interfaces.UseCases;
using TaskFlow.Application.UseCases.AppUsers;
using TaskFlow.Application.UseCases.Companies;
using TaskFlow.Application.UseCases.Authentication;

var builder = WebApplication.CreateBuilder(args);



var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT key is not configured.");

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)),
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
builder.Services.AddHttpContextAccessor();
builder.Services.AddValidatorsFromAssemblyContaining<CreateAppUserRequestValidator>();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ILoginUseCase, LoginUseCase>();
builder.Services.AddScoped<ICreateCompanyUseCase, CreateCompanyUseCase>();
builder.Services.AddScoped<ICreateAppUserUseCase, CreateAppUserUseCase>();
builder.Services.AddScoped<IAppUserRepository, AppUserRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();        
builder.Services.AddScoped<ICurrentUser, CurrentUser>();
builder.Services.AddScoped<ITokenGenerator, JwtTokenGenerator>();
builder.Services.AddScoped<IPasswordHasher, BCryptPasswordHasher>();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlerMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


