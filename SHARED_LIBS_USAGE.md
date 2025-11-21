# Usage Examples for Shared Libraries

## Using Shared Libraries in Applications

### Example 1: Task Tracker with Shared Utilities

**Before (apps/task-tracker/src/app/app.tsx):**
```typescript
// Generate unique ID locally
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
```

**After (with shared library):**
```typescript
import { generateId } from '@libs/utils';

// Use shared implementation
const handleAddTask = (title: string, description: string): void => {
  const newTask: Task = {
    id: generateId(), // Using shared utility
    title,
    description,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  setTasks((prevTasks) => [newTask, ...prevTasks]);
};
```

### Example 2: Blog Platform with Date Formatting

**Before (apps/blog-platform/src/pages/PostDetailPage.tsx):**
```typescript
// Manual date formatting
const date = new Date(post.createdAt);
const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
```

**After (with shared library):**
```typescript
import { formatDate, formatRelativeTime } from '@libs/utils';

// Use shared utilities
<div className="text-gray-600">
  {formatDate(post.createdAt)} · {formatRelativeTime(post.createdAt)}
</div>
```

### Example 3: Feedback Form with Shared Hooks

**Before (apps/feedback-form/src/hooks/useLocalStorage.ts):**
```typescript
// Local implementation
import { useLocalStorage } from '../hooks/useLocalStorage';
```

**After (with shared library):**
```typescript
// Use shared implementation
import { useLocalStorage, useDebounce } from '@libs/hooks';

const [formData, setFormData] = useLocalStorage('feedback-form-draft', initialFormData);
const debouncedFormData = useDebounce(formData, 500);
```

### Example 4: Blog Platform with JSON Parsing

**Before (apps/blog-platform/src/lib/db-service.ts):**
```typescript
// Local implementation
function parseJSON<T>(json: string): T {
  try {
    return JSON.parse(json);
  } catch {
    return [] as T;
  }
}
```

**After (with shared library):**
```typescript
import { parseJSON } from '@libs/utils';

function mapToPost(row: any, author?: User): Post {
  return {
    id: row.id,
    title: row.title,
    tags: parseJSON<string[]>(row.tags, []), // Using shared utility with fallback
    // ...
  };
}
```

### Example 5: Multi-App Form Validation

**Any app can now use:**
```typescript
import { isValidEmail, isValidPhone, formatPhoneNumber } from '@libs/utils';
import { useFormValidation } from '@libs/hooks';

const MyForm = () => {
  const { validateAll, getFieldError, touchField } = useFormValidation({
    email: (value) => !isValidEmail(value) ? 'Invalid email' : undefined,
    phone: (value) => value && !isValidPhone(value) ? 'Invalid phone' : undefined,
  });
  
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };
};
```

### Example 6: Blog Post Creation with Multiple Utils

```typescript
import { generateId, slugify, truncateText, formatDate } from '@libs/utils';

const createPost = (title: string, content: string) => {
  return {
    id: generateId(),
    slug: slugify(title), // "My Post Title" -> "my-post-title"
    title,
    content,
    excerpt: truncateText(content, 200), // First 200 chars + "..."
    createdAt: formatDate(new Date()),
  };
};
```

### Example 7: Task Tracker with LocalStorage Persistence

```typescript
import { useLocalStorage } from '@libs/hooks';
import { generateId, formatRelativeTime } from '@libs/utils';

const TaskTracker = () => {
  // Persist tasks to localStorage automatically
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  
  const addTask = (title: string) => {
    const newTask = {
      id: generateId(),
      title,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };
  
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          {task.title} - {formatRelativeTime(task.createdAt)}
        </div>
      ))}
    </div>
  );
};
```

### Example 8: Multi-Step Form with Shared Hooks

```typescript
import { useMultiStepForm, useFormValidation } from '@libs/hooks';

const WizardForm = () => {
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    progressPercentage,
  } = useMultiStepForm({ totalSteps: 3 });
  
  const { validateAll } = useFormValidation({
    // validation rules
  });
  
  const handleNext = () => {
    if (validateAll(formData)) {
      nextStep();
    }
  };
  
  return (
    <div>
      <div>Progress: {progressPercentage}%</div>
      {/* Step content */}
      <button disabled={isFirstStep} onClick={previousStep}>Back</button>
      <button onClick={handleNext}>
        {isLastStep ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};
```

## Testing Shared Code

### Unit Test Example for Utils
```typescript
// libs/utils/src/lib/utils.spec.ts
import { isValidEmail, formatPhoneNumber, slugify } from './utils';

describe('Utils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });
    
    it('should reject invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false);
    });
  });
  
  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
    });
  });
});
```

### Integration Test Example
```typescript
// apps/blog-platform/src/lib/db-service.spec.ts
import { parseJSON } from '@libs/utils';

describe('Database Service', () => {
  it('should parse post tags safely', () => {
    const tags = parseJSON<string[]>('["react", "typescript"]', []);
    expect(tags).toEqual(['react', 'typescript']);
  });
  
  it('should return fallback for invalid JSON', () => {
    const tags = parseJSON<string[]>('invalid', []);
    expect(tags).toEqual([]);
  });
});
```

## Benefits Demonstrated

### 1. Code Reuse
- Single implementation used across 3+ apps
- No duplication of validation logic
- Shared behavior patterns

### 2. Consistency
- Same date formatting everywhere
- Unified validation rules
- Consistent ID generation

### 3. Maintainability
- Fix a bug once, all apps benefit
- Add features in one place
- Easy to locate shared code

### 4. Type Safety
- Full TypeScript support
- Generic types for flexibility
- Compile-time checks

### 5. Testability
- Test shared code independently
- Higher test coverage
- Easier mocking in tests

## Recommended Next Steps

1. **Refactor Existing Code**: Update all apps to use shared libraries
2. **Add More Utilities**: Extract additional common patterns
3. **Create UI Components Library**: Share React components
4. **Write Tests**: Add comprehensive test coverage
5. **Document Patterns**: Create usage guidelines

---

All shared libraries are now available with the `@libs/*` alias across the entire monorepo! 🎉
