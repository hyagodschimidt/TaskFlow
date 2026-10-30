namespace TaskFlow.Domain.Exceptions
{
    public class InvalidRoleTransitionException : Exception
    {
        public InvalidRoleTransitionException(string message) : base(message)
        {
        }
    }
}
