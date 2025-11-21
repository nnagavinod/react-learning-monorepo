import {
  PersonalInfo,
  FeedbackData,
  ValidationErrors,
} from '../types/form.types';

/**
 * Validate email format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate US phone format
 */
const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate personal info step
 */
export const validatePersonalInfo = (
  values: PersonalInfo
): ValidationErrors<PersonalInfo> => {
  const errors: ValidationErrors<PersonalInfo> = {};

  // Name validation
  if (!values.name || values.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  if (!values.email || values.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation (optional)
  if (values.phone && !isValidPhone(values.phone)) {
    errors.phone = 'Phone must be in format (###) ###-####';
  }

  // Age validation (optional)
  if (values.age) {
    const age = parseInt(values.age, 10);
    if (isNaN(age)) {
      errors.age = 'Age must be a number';
    } else if (age < 13 || age > 120) {
      errors.age = 'Age must be between 13 and 120';
    }
  }

  return errors;
};

/**
 * Validate feedback step
 */
export const validateFeedback = (
  values: FeedbackData
): ValidationErrors<FeedbackData> => {
  const errors: ValidationErrors<FeedbackData> = {};

  // Category validation
  if (!values.category) {
    errors.category = 'Please select a category';
  }

  // Rating validation
  if (!values.rating || values.rating < 1) {
    errors.rating = 'Please provide a rating';
  }

  // Message validation
  if (!values.message || values.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (values.message.length > 500) {
    errors.message = 'Message must not exceed 500 characters';
  }

  return errors;
};

/**
 * Format phone number as user types
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');

  // Format as (###) ###-####
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  }
};
