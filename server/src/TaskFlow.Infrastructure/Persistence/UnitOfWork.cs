using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TaskFlow.Application.Interfaces.Persistence;
using TaskFlow.Application.Exceptions;

namespace TaskFlow.Infrastructure.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public UnitOfWork (AppDbContext context)
        {
            _context = context;
        }
        public async Task SaveChangesAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx)
                {
                    if (sqlEx.Number == 2601 || sqlEx.Number == 2627)
                    {
                        throw new ConflictException("A resource with the same unique data already exists.");
                    }
                }
                throw;
            }
        }
    }
}
