export const messages = {
    required: (field) => `${field} is required.`,
    minLength: (field, min) => `${field} must be at least ${min} characters long.`,
    maxLength: (field, max) => `${field} must be less than or equal to ${max} characters.`,
    invalid: (field) => `Please enter a valid ${field}.`,
    requireNumber: (field) => `${field} must contain at least one number.`,
    requireLetter: (field) => `${field} must contain at least one letter.`,
    passwordMismatch: () => `Passwords do not match.`,
    cancelConfirm: `Are you sure you want to cancel?`,
    agreeTermPolicyRequired: `Please read and agree to the terms and conditions, and the privacy policy before continuing.`,
};