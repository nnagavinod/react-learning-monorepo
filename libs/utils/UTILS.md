# @react-learning-monorepo/utils

Reusable utility functions library for the monorepo.

## Available Utilities

### Validation

#### isValidEmail

Validate email format.

```typescript
import { isValidEmail } from '@libs/utils';

const valid = isValidEmail('user@example.com'); // true
```

#### isValidPhone

Validate US phone format.

```typescript
import { isValidPhone } from '@libs/utils';

const valid = isValidPhone('(555) 123-4567'); // true
```

#### formatPhoneNumber

Format phone number as user types.

```typescript
import { formatPhoneNumber } from '@libs/utils';

const formatted = formatPhoneNumber('5551234567'); // "(555) 123-4567"
```

### ID Generation

#### generateId

Generate unique ID.

```typescript
import { generateId } from '@libs/utils';

const id = generateId(); // "1637520000000-abc123def"
```

### JSON Utilities

#### parseJSON

Parse JSON safely with fallback.

```typescript
import { parseJSON } from '@libs/utils';

const data = parseJSON<string[]>('["a","b"]', []); // ["a", "b"]
const fallback = parseJSON<string[]>('invalid', []); // []
```

### Date Formatting

#### formatDate

Format date to readable string.

```typescript
import { formatDate } from '@libs/utils';

const formatted = formatDate(new Date()); // "November 21, 2025"
```

#### formatRelativeTime

Format date to relative time.

```typescript
import { formatRelativeTime } from '@libs/utils';

const relative = formatRelativeTime(new Date(Date.now() - 3600000)); // "1 hours ago"
```

### Text Utilities

#### truncateText

Truncate text with ellipsis.

```typescript
import { truncateText } from '@libs/utils';

const truncated = truncateText('Long text here', 10); // "Long text..."
```

#### slugify

Convert text to URL-friendly format.

```typescript
import { slugify } from '@libs/utils';

const slug = slugify('Hello World!'); // "hello-world"
```

## Usage in Applications

```typescript
// Using aliases
import { formatDate, generateId } from '@libs/utils';

// Or with full path
import { formatDate } from '@react-learning-monorepo/utils';
```

## TypeScript Support

All utilities are fully typed with TypeScript for maximum type safety.

## Common Use Cases

### Form Validation
```typescript
import { isValidEmail, isValidPhone, formatPhoneNumber } from '@libs/utils';

const validateForm = (data) => {
  const errors = {};
  if (!isValidEmail(data.email)) errors.email = 'Invalid email';
  if (!isValidPhone(data.phone)) errors.phone = 'Invalid phone';
  return errors;
};
```

### Data Processing
```typescript
import { parseJSON, formatDate, truncateText } from '@libs/utils';

const processData = (raw) => ({
  tags: parseJSON(raw.tags, []),
  date: formatDate(raw.created_at),
  excerpt: truncateText(raw.content, 100),
});
```

### URL Handling
```typescript
import { slugify, generateId } from '@libs/utils';

const createPost = (title) => ({
  id: generateId(),
  slug: slugify(title),
  title,
});
```
