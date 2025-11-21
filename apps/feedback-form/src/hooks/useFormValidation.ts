import { useState, useCallback } from 'react';
import { ValidationErrors, TouchedFields } from '../types/form.types';

/**
 * Custom hook for form validation
 * @param validationRules - validation function that returns errors
 * @returns validation state and methods
 */
export function useFormValidation<T extends Record<string, any>>(
  validationRules: (values: T) => ValidationErrors<T>
) {
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<TouchedFields<T>>({});

  // Validate all fields
  const validate = useCallback(
    (values: T): boolean => {
      const validationErrors = validationRules(values);
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    },
    [validationRules]
  );

  // Mark field as touched
  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  // Mark all fields as touched
  const setAllTouched = useCallback((values: T) => {
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({
        ...acc,
        [key]: true,
      }),
      {} as TouchedFields<T>
    );
    setTouched(allTouched);
  }, []);

  // Get error for field only if touched
  const getFieldError = useCallback(
    (field: keyof T): string | undefined => {
      return touched[field] ? errors[field] : undefined;
    },
    [errors, touched]
  );

  // Check if field has error and is touched
  const hasFieldError = useCallback(
    (field: keyof T): boolean => {
      return Boolean(touched[field] && errors[field]);
    },
    [errors, touched]
  );

  // Reset validation state
  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validate,
    setFieldTouched,
    setAllTouched,
    getFieldError,
    hasFieldError,
    resetValidation,
  };
}
