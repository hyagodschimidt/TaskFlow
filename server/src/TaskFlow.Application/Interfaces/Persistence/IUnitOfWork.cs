using System;
using System.Collections.Generic;
using System.Text;

namespace TaskFlow.Application.Interfaces.Persistence
{
    public interface IUnitOfWork
    {
        Task SaveChangesAsync();
    }
}
