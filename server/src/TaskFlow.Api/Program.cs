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
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services
    .AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme)
    .Configure<IOptions<JwtSettings>>((options, jwtSettings) =>
    {
        var settings = jwtSettings.Value;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = settings.Issuer,
            ValidateAudience = true,
            ValidAudience = settings.Audience,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(settings.Key)),
            ValidateIssuerSigningKey = true
        };
    });

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();
builder.Services.AddAuthorization();
builder.Services
    .AddOptions<JwtSettings>()
    .Bind(builder.Configuration.GetSection("Jwt"))
    .Validate(settings => !string.IsNullOrWhiteSpace(settings.Key), "JWT key must be configured.")
    .Validate(settings => !string.IsNullOrWhiteSpace(settings.Issuer), "JWT issuer must be configured.")
    .Validate(settings => !string.IsNullOrWhiteSpace(settings.Audience), "JWT audience must be configured.")
    .Validate(settings => settings.ExpiresMinutes > 0, "JWT expiry minutes must be greater than zero.")
    .ValidateOnStart();

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
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


