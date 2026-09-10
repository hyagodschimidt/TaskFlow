namespace TaskFlow.Application.Normalization
{
    public static class TaxIdNormalizer
    {
        public static string Normalize(string taxId)
        {
            return string.Concat(taxId.Where(char.IsDigit));
        }
    }
}
