namespace TaskFlow.Application.Interfaces.Persistence
{
    public interface IUnitOfWork
    {
        Task SaveChangesAsync();
    }
}
