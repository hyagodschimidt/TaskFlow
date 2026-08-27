using FluentValidation;
using TaskFlow.Api.Exceptions;
using TaskFlow.Application.Exceptions;
using TaskFlow.Domain.Exceptions;


namespace TaskFlow.Api.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlerMiddleware> _logger;

        public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }

            catch (ValidationException ex)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                
                _logger.LogInformation("Validation failed: {Message}", ex.Message);

                await context.Response.WriteAsJsonAsync(new
                {
                    status = context.Response.StatusCode,

                    message = "Validation failed",
                    errors = ex.Errors.Select(error => new
                    {
                        field = error.PropertyName,
                        message = error.ErrorMessage
                    })
                });
            }
            catch (NotFoundException ex)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;

                _logger.LogInformation("Not found: {Message}", ex.Message);

                await context.Response.WriteAsJsonAsync(new
                {
                    status = context.Response.StatusCode,
                    message = ex.Message
                });
            }
            catch (ForbiddenException ex)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;

                _logger.LogWarning("Forbidden: {Message}", ex.Message);

                await context.Response.WriteAsJsonAsync(new
                {
                    status = context.Response.StatusCode,
                    message = ex.Message
                });
            }
            catch (InvalidCredentialsException ex)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;

                _logger.LogInformation("Invalid credentials: {Message}", ex.Message);

                await context.Response.WriteAsJsonAsync(new
                {
                    status = context.Response.StatusCode,
                    message = ex.Message
                });
            }
            catch (DomainValidationException ex)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                
                _logger.LogInformation("Domain validation failed: {Message}", ex.Message);
                
                await context.Response.WriteAsJsonAsync(new
                {
                    status = context.Response.StatusCode,
                    message = ex.Message,
                });
            }
            catch (InvalidCurrentUserException ex)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                
                _logger.LogWarning("Invalid current user: {Message}", ex.Message);

                await context.Response.WriteAsJsonAsync(new
                {
                    status = context.Response.StatusCode,
                    message = "Invalid authentication context",
                });
            }
            catch (InvalidTaskStateException ex)
            {
                context.Response.StatusCode = StatusCodes.Status409Conflict;

                _logger.LogWarning("Invalid task state: {Message}", ex.Message);

                await context.Response.WriteAsJsonAsync(new
                {
                    status = context.Response.StatusCode,
                    message = ex.Message,
                });
            }
            catch (ConflictException ex)
            {
                context.Response.StatusCode = StatusCodes.Status409Conflict;

                _logger.LogWarning("Conflict: {Message}", ex.Message);

                await context.Response.WriteAsJsonAsync(new
                {
                    status = context.Response.StatusCode,
                    message = ex.Message,
                });
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                _logger.LogError(ex, "An unexpected error occurred.");   
                
                await context.Response.WriteAsJsonAsync(new
                {
                    status = context.Response.StatusCode,
                    message = "An unexpected error occurred.",
                });
            }
        }
    }
}
