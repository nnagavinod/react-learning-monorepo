# @react-learning-monorepo/hooks

Reusable React hooks library for the monorepo.

## Available Hooks

### useLocalStorage

Persist state to browser localStorage with automatic serialization.

```typescript
import { useLocalStorage } from '@libs/hooks';

const [value, setValue, removeValue] = useLocalStorage('key', initialValue);
```

**Parameters:**
- `key: string` - localStorage key
- `initialValue: T` - initial value if key doesn't exist

**Returns:**
- `[storedValue, setValue, removeValue]`

### useDebounce

Debounce a value for performance optimization.

```typescript
import { useDebounce } from '@libs/hooks';

const debouncedValue = useDebounce(value, 500);
```

**Parameters:**
- `value: T` - value to debounce
- `delay: number` - delay in milliseconds

**Returns:**
- `debouncedValue: T`

### useFormValidation

Generic form validation with touched field tracking.

```typescript
import { useFormValidation } from '@libs/hooks';

const {
  errors,
  touched,
  validateField,
  validateAll,
  touchField,
  touchAll,
  getFieldError,
  reset,
} = useFormValidation({
  email: (value) => !value ? 'Email is required' : undefined,
  name: (value) => !value ? 'Name is required' : undefined,
});
```

**Parameters:**
- `validationRules: ValidationRules<T>` - Validation rules for each field

**Returns:**
- `errors` - Current validation errors
- `touched` - Touched fields tracking
- `validateField` - Validate single field
- `validateAll` - Validate all fields
- `touchField` - Mark field as touched
- `touchAll` - Mark all fields as touched
- `getFieldError` - Get error for field (only if touched)
- `reset` - Reset validation state

### useMultiStepForm

Manage multi-step form navigation and completion tracking.

```typescript
import { useMultiStepForm } from '@libs/hooks';

const {
  currentStep,
  completedSteps,
  isFirstStep,
  isLastStep,
  progressPercentage,
  nextStep,
  previousStep,
  goToStep,
  completeStep,
  markStepComplete,
  isStepCompleted,
  reset,
} = useMultiStepForm({
  totalSteps: 3,
  onStepChange: (step) => console.log('Step changed to:', step),
});
```

**Parameters:**
- `totalSteps: number` - Total number of steps
- `onStepChange?: (step: number) => void` - Optional callback on step change

**Returns:**
- `currentStep` - Current step index (0-based)
- `completedSteps` - Array of completed step indices
- `isFirstStep` - Whether on first step
- `isLastStep` - Whether on last step
- `progressPercentage` - Progress percentage (0-100)
- `nextStep` - Go to next step
- `previousStep` - Go to previous step
- `goToStep` - Go to specific step
- `completeStep` - Mark current step complete and advance
- `markStepComplete` - Mark specific step complete
- `isStepCompleted` - Check if step is completed
- `reset` - Reset to first step

## Usage in Applications

```typescript
// Using aliases
import { useLocalStorage, useDebounce } from '@libs/hooks';

// Or with full path
import { useLocalStorage } from '@react-learning-monorepo/hooks';
```

## TypeScript Support

All hooks are fully typed with TypeScript generics for maximum type safety.
