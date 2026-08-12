using System;
using System.Collections.Generic;
using System.Text;

namespace TaskFlow.Application.Interfaces.Security
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
    }
}
