/**
 * Form step types
 */
export type FormStep = 'personal' | 'feedback' | 'review';

/**
 * Personal information interface
 */
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  age: string;
}

/**
 * Feedback data interface
 */
export interface FeedbackData {
  category: string;
  rating: number;
  message: string;
  anonymous: boolean;
  satisfaction: number;
}

/**
 * Complete feedback form data
 */
export interface FeedbackFormData {
  personal: PersonalInfo;
  feedback: FeedbackData;
}

/**
 * Validation errors type
 */
export type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * Form submission with metadata
 */
export interface FormSubmission {
  id: string;
  data: FeedbackFormData;
  timestamp: Date;
}

/**
 * Touched fields tracking
 */
export type TouchedFields<T> = {
  [K in keyof T]?: boolean;
};

/**
 * Feedback categories
 */
export const FEEDBACK_CATEGORIES = [
  { label: 'Product Quality', value: 'product' },
  { label: 'Customer Service', value: 'service' },
  { label: 'Website Experience', value: 'website' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Delivery', value: 'delivery' },
  { label: 'Other', value: 'other' },
] as const;

/**
 * Feedback category value type extracted from const
 */
export type FeedbackCategoryValue =
  (typeof FEEDBACK_CATEGORIES)[number]['value'];
