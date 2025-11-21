import { useState, useCallback } from 'react';

export type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

export type TouchedFields<T> = {
  [K in keyof T]?: boolean;
};

export type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K], allValues: T) => string | undefined;
};

/**
 * Custom hook for form validation with touched field tracking
 * @param validationRules - Validation rules for each field
 * @returns validation state and methods
 */
export function useFormValidation<T extends Record<string, any>>(
  validationRules: ValidationRules<T>
) {
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<TouchedFields<T>>({});

  // Validate a single field
  const validateField = useCallback(
    (
      fieldName: keyof T,
      value: T[keyof T],
      allValues: T
    ): string | undefined => {
      const rule = validationRules[fieldName];
      if (!rule) return undefined;
      return rule(value, allValues);
    },
    [validationRules]
  );

  // Validate all fields
  const validateAll = useCallback(
    (values: T): boolean => {
      const newErrors: ValidationErrors<T> = {};
      let isValid = true;

      (Object.keys(validationRules) as Array<keyof T>).forEach((fieldName) => {
        const error = validateField(fieldName, values[fieldName], values);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    },
    [validationRules, validateField]
  );

  // Mark field as touched
  const touchField = useCallback((fieldName: keyof T) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  // Mark all fields as touched
  const touchAll = useCallback(() => {
    const allTouched: TouchedFields<T> = {};
    (Object.keys(validationRules) as Array<keyof T>).forEach((fieldName) => {
      allTouched[fieldName] = true;
    });
    setTouched(allTouched);
  }, [validationRules]);

  // Get error for a field (only if touched)
  const getFieldError = useCallback(
    (fieldName: keyof T): string | undefined => {
      return touched[fieldName] ? errors[fieldName] : undefined;
    },
    [errors, touched]
  );

  // Reset validation state
  const reset = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    validateAll,
    touchField,
    touchAll,
    getFieldError,
    reset,
  };
}
