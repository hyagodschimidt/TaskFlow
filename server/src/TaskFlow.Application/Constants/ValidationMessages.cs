namespace TaskFlow.Application.Constants
{
    public static class ValidationMessages
    {
        public static string InvalidEnum<TEnum>(string fieldName) where TEnum : struct, Enum
        {
            return $"Invalid {fieldName}. Allowed values: {string.Join(", ", Enum.GetNames<TEnum>())}.";
        }

        public const string InvalidUserRoleForCreation = "User role must be Admin or Member.";

        public const string RequiredTitle = "Title is required.";
        public const string TitleMinLength = "Title must have at least 5 characters.";
        public const string TitleMaxLength = "Title must have at most 50 characters.";

        public const string RequiredDescription = "Description is required.";
        public const string DescriptionMinLength = "Description must have at least 25 characters.";
        public const string DescriptionMaxLength = "Description must have at most 2000 characters.";

        public const string RequiredUser = "A task muts be assigned to a member.";

        public const string RequiredPriority = "A priority must be selected because this company requires task priority.";

        public const string FutureDueDate = "DueDate must be a future date";

        public const string RequiredCompletionReport = "A completion report is required to complete the task.";
        public const string ReportMinLenght = "Completion report must have at least 30 characters.";
        public const string ReportMaxLenght = "Completion report must have at most 2000 characters.";

        public const string RequiredEmail = "Email is required.";
        public const string InvalidEmail = "Email is invalid.";

        public const string RequiredPassword = "Password is required.";
        public const string PasswordMinLength = "Password must have at least 6 characters.";
        public const string PasswordMustContainUppercase = "Password must contain at least one uppercase letter.";
        public const string PasswordMustContainLowercase = "Password must contain at least one lowercase letter.";
        public const string PasswordMustContainNumber = "Password must contain at least one number.";

        public const string RequiredName = "Name is required.";

        public const string RequiredCompanyName = "Company name is required";
        public const string RequiredTaxId = "Tax ID is required";
        public const string InvalidTaxId = "Tax ID must contain only letters and numbers. Do not use spaces or symbols.";
        public const string TaxIdMinLength = "Tax ID must have at least 5 characters.";
        public const string TaxIdMaxLength = "Tax Id must have at most 30 charcters.";

    }
}

