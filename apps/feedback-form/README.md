# Multi-Step Feedback Form

A comprehensive, production-ready feedback form application with multi-step navigation, real-time validation, auto-save functionality, and submission history tracking.

## Features

### 🎯 Core Functionality
- **Multi-step form** with 3 distinct steps:
  - Personal Info (name, email, phone, age)
  - Feedback (category, rating, message, satisfaction slider, anonymous toggle)
  - Review & Submit (comprehensive review with edit options)
- **Smart validation** with real-time feedback
- **Auto-save** to localStorage with debouncing
- **Submission history** with timeline display
- **Progress indicators** with visual feedback

### ✅ Form Validation
- Real-time validation on field blur
- Display errors only for touched fields
- Prevent navigation with invalid data
- Email format validation
- US phone format: (###) ###-####
- Character limits (10-500 for message)
- Age range validation (13-120)
- Required field indicators

### 💾 Data Persistence
- Auto-save draft to localStorage as user types
- Restore draft on page refresh
- Clear draft after successful submission
- Submission history persisted across sessions
- Individual or bulk deletion of history entries

### 📊 User Experience
- Progress bar showing completion percentage
- Step indicator with visual states
- Smooth transitions between steps
- Edit from review step
- Timestamp tracking for submissions
- Success/error notifications
- Mobile-responsive design

## Technology Stack

- **React 19**: Latest version with modern hooks
- **TypeScript 5.9**: Full type safety throughout
- **Vite**: Lightning-fast dev server
- **Tailwind CSS 4**: Utility-first styling
- **RSuite**: Professional UI component library
- **Custom React Hooks**: Reusable logic

## Project Structure

```
apps/feedback-form/
├── src/
│   ├── app/
│   │   └── app.tsx                    # Main application container
│   ├── components/
│   │   ├── FormSteps.tsx              # Progress indicator
│   │   ├── PersonalInfoStep.tsx       # Step 1: Personal information
│   │   ├── FeedbackStep.tsx           # Step 2: Feedback details
│   │   ├── ReviewStep.tsx             # Step 3: Review & edit
│   │   ├── FormNavigation.tsx         # Previous/Next buttons
│   │   ├── FormHistory.tsx            # Submission history timeline
│   │   └── index.ts                   # Component exports
│   ├── hooks/
│   │   ├── useLocalStorage.ts         # Persist data to localStorage
│   │   ├── useDebounce.ts             # Debounce value changes
│   │   ├── useFormValidation.ts       # Validation logic & touched fields
│   │   ├── useMultiStepForm.ts        # Step navigation & management
│   │   └── index.ts                   # Hook exports
│   ├── types/
│   │   └── form.types.ts              # TypeScript interfaces
│   ├── utils/
│   │   └── validation.ts              # Validation functions
│   ├── main.tsx                       # Application entry point
│   └── styles.css                     # Global styles
├── index.html                         # HTML template
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
└── vite.config.ts                     # Vite configuration
```

## Custom Hooks

### useLocalStorage<T>
Persists state to browser localStorage with automatic serialization.

```typescript
const [value, setValue, removeValue] = useLocalStorage('key', initialValue);
```

**Features:**
- Automatic JSON serialization/deserialization
- Safe error handling
- SSR compatible
- TypeScript generic support

### useDebounce<T>
Debounces a value to reduce update frequency.

```typescript
const debouncedValue = useDebounce(value, 500);
```

**Use case:** Auto-save without overwhelming localStorage

### useFormValidation<T>
Manages form validation state and touched fields.

```typescript
const validation = useFormValidation(validationRules);
```

**Methods:**
- `validate(values)` - Validate all fields
- `setFieldTouched(field)` - Mark field as touched
- `getFieldError(field)` - Get error only if touched
- `hasFieldError(field)` - Check if field has error
- `resetValidation()` - Clear all validation state

### useMultiStepForm
Manages multi-step form navigation with validation.

```typescript
const multiStep = useMultiStepForm(validateStep);
```

**Properties:**
- `currentStep` - Current active step
- `progress` - Completion percentage
- `nextStep()` - Navigate forward (with validation)
- `previousStep()` - Navigate backward
- `goToStep(step)` - Jump to specific step
- `isStepCompleted(step)` - Check completion status

## Type Definitions

### PersonalInfo
```typescript
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  age: string;
}
```

### FeedbackData
```typescript
interface FeedbackData {
  category: string;
  rating: number;
  message: string;
  anonymous: boolean;
  satisfaction: number;
}
```

### FeedbackFormData
```typescript
interface FeedbackFormData {
  personal: PersonalInfo;
  feedback: FeedbackData;
}
```

### FormSubmission
```typescript
interface FormSubmission {
  id: string;
  data: FeedbackFormData;
  timestamp: Date;
}
```

## Validation Rules

### Personal Info
- **Name**: Required, min 2 characters
- **Email**: Required, valid email format
- **Phone**: Optional, format (###) ###-####
- **Age**: Optional, 13-120 range

### Feedback
- **Category**: Required selection
- **Rating**: Required, 1-5 stars
- **Message**: Required, 10-500 characters
- **Satisfaction**: Slider 0-100%
- **Anonymous**: Optional toggle

## RSuite Components Used

### Form Components
- `Form`, `Form.Group`, `Form.ControlLabel`, `Form.Control`, `Form.HelpText`
- `Input`, `InputNumber`, `Textarea`
- `SelectPicker` - Category selection
- `Rate` - Star rating
- `Slider` - Satisfaction level
- `Toggle` - Anonymous submission

### Display Components
- `Steps` - Progress indicator
- `Panel` - Card containers
- `Timeline` - Submission history
- `Progress.Line` - Progress bar
- `Tag` - Labels and badges
- `Message`, `toaster` - Notifications

### Interactive Components
- `Button`, `ButtonToolbar` - Navigation
- Icons: `EditIcon`, `TrashIcon`, `ArrowLeftLineIcon`, `ArrowRightLineIcon`, `CheckIcon`

## Development

### Start Development Server
```bash
npx nx serve feedback-form
```

The app will be available at http://localhost:4202

### Build for Production
```bash
npx nx build feedback-form
```

### Type Check
```bash
npx nx typecheck feedback-form
```

## Key Features Explained

### Auto-Save Mechanism
The form automatically saves to localStorage as you type, with a 500ms debounce to prevent excessive saves:

```typescript
const debouncedFormData = useDebounce(formData, 500);
useEffect(() => {
  // Auto-save handled by useLocalStorage
}, [debouncedFormData]);
```

### Validation Strategy
Validation occurs in two phases:
1. **Continuous validation** - Updates error state on every change
2. **Display validation** - Shows errors only for touched fields

This prevents showing errors before the user has interacted with a field.

### Step Navigation
Navigation between steps requires successful validation:

```typescript
const nextStep = () => {
  if (validateStep(currentStep)) {
    // Mark step as completed
    // Move to next step
  }
};
```

### Phone Number Formatting
Phone numbers are automatically formatted as the user types:
- Input: "5551234567"
- Display: "(555) 123-4567"

### Submission History
All submissions are stored with:
- Unique ID
- Complete form data
- Timestamp
- Individual delete capability
- Bulk clear functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## LocalStorage Keys

- `feedback-form-draft` - Current form data
- `feedback-submissions` - Array of submissions

## Best Practices Implemented

### TypeScript
- Full type coverage with no `any` types
- Generic hook implementations
- Proper interface definitions
- Type-safe validation

### React
- Custom hooks for reusable logic
- Proper dependency arrays
- Controlled components
- Optimized re-renders

### Accessibility
- Semantic HTML
- Form labels and descriptions
- Keyboard navigation
- Error announcements

### Performance
- Debounced auto-save
- Efficient validation
- Memoized calculations
- Optimized component structure

### Code Organization
- Clear separation of concerns
- Reusable utilities
- Consistent naming
- Comprehensive comments

## Future Enhancements

- [ ] Email submission backend integration
- [ ] File attachment support
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Export submissions to CSV
- [ ] Analytics dashboard
- [ ] Custom validation rules configuration
- [ ] Conditional field visibility

## License

MIT
