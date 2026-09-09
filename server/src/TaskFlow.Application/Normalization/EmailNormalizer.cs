namespace TaskFlow.Application.Normalization
{
    public static class EmailNormalizer
    {
        public static string Normalize(string email)
        { 
            return email.Trim().ToLowerInvariant();
        }
    }
}