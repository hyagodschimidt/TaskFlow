namespace TaskFlow.Domain.Exceptions
{
    public class InvalidTaskStateException : Exception
    {
        public InvalidTaskStateException(string message) : base(message)
        {
        }
    }
}
