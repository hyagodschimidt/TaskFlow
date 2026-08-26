namespace TaskFlow.Api.Exceptions
{
    public class InvalidCurrentUserException : Exception
    {
        public InvalidCurrentUserException(string message) : base(message)
        {
        }
    }
}
