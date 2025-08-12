# Style Guide

## Naming

- Use `camelCase` for variable names
- Use `PascalCase` for class names and React components
- Use `kebab-case` for file names
- Use `UPPER_CASE` for constants
- Use `snake_case` for database table names
- Use `camelCase` for function names
- Use `PascalCase` for TypeScript interfaces and types
- Use `camelCase` for component props and event handlers

## React Components

### Component Structure

- Use function declarations for components (not arrow functions)
- Inline component prop type definitions rather than separate interfaces
- Prefer inlining event handlers
- Use ternaries rather than short-circuit booleans in JSX
- Always inline types for function parameters

```tsx
// ✅ Good
export function Button({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg px-4 py-2"
    >
      {children}
    </button>
  )
}

// ❌ Avoid
const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
```

### Component Organization

- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into custom hooks
- Group related components in the same directory

### Props and State

- Use TypeScript for all prop definitions
- Prefer explicit prop types over `any`
- Use optional props with default values when appropriate
- Use `React.ReactNode` for children props

## TypeScript

### Type Definitions

- Use `type` for simple type aliases
- Use `interface` for object shapes that may be extended
- Prefer inline types for component props
- Use `as const` for literal type arrays
- Prefer inferring return types over explicit return types except in situations where typescript cannot correctly infer the return type
- Prefer object function arguments over positional function arguments
- Type casting and type assertions should be avoided. If they are necessary, they must be commented with a justification.

```tsx
// ✅ Good
type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface User {
  id: number
  email: string
  name?: string
}

// For component props, inline the types
export function UserCard({
  user,
  onEdit,
}: {
  user: User
  onEdit: (user: User) => void
}) {
  // ...
}

// ❌ Avoid
interface UserCardProps {
  user: User
  onEdit: (user: User) => void
}

export function UserCard({ user, onEdit }: UserCardProps) {
  // ...
}

// ❌ Avoid
export function isTooLong(value: string, maxLength: number): boolean {
  return value.length > maxLength
}

// ✅ Good
export function isTooLong(value: string, maxLength: number) {
  return value.length > maxLength
}
```

### Import/Export Patterns

- Use named exports for components and utilities
- Use default exports for route components and pages
- Group imports: React, third-party libraries, internal modules, relative imports
- Use `type` imports for TypeScript types

```tsx
// ✅ Good import order
import { type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Stack } from '~/components/stack'
import { type User } from './types'
```

## Form Handling

### Validation

- Use Valibot for schema validation
- Create reusable validation schemas
- Use `@conform-to/react` for form handling
- Provide clear, user-friendly error messages

```tsx
// ✅ Good validation schema
export const LoginSchema = v.object({
  email: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.string('Please enter an email address'),
    v.email('Please enter a valid email address'),
  ),
  password: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.string('Please enter a password'),
  ),
})
```

### Form Components

- Use semantic HTML form elements
- Include proper ARIA attributes
- Provide clear labels and descriptions
- Handle loading and error states gracefully

## Testing

### Unit Tests

- Use Vitest for unit testing
- Write descriptive test names
- Test both success and error cases
- Use `describe` blocks to group related tests

```tsx
// ✅ Good test structure
describe('transformEmptyStringToUndefined', () => {
  test('non empty string returns as is', () => {
    const result = v.parse(
      v.pipe(v.unknown(), transformEmptyStringToUndefined),
      'test',
    )
    expect(result).toBe('test')
  })

  test('empty string returns undefined', () => {
    const result = v.parse(
      v.pipe(v.unknown(), transformEmptyStringToUndefined),
      '',
    )
    expect(result).toBeUndefined()
  })
})
```

### Component Testing

- Use Storybook for component testing
- Include accessibility tests
- Test user interactions with `play` functions
- Verify proper ARIA attributes and descriptions

### E2E Testing

- Use Playwright for end-to-end tests
- Test critical user flows
- Include authentication flows
- Test responsive behavior

## Database

### Schema Design

- Use Drizzle ORM for database operations
- Use `snake_case` for table and column names
- Include proper foreign key relationships
- Use appropriate data types and constraints

```tsx
// ✅ Good schema definition
export const users = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
})
```

### Repository Pattern

- Use repository pattern for data access
- Separate business logic from data access
- Use dependency injection for testability
- Include proper error handling

## Security

### Password Handling

- Use Web Crypto API for password hashing
- Use PBKDF2 with high iteration counts
- Never store plain text passwords
- Use secure random salt generation

### Authentication

- Use session-based authentication
- Implement proper session management
- Include CSRF protection
- Use secure cookie settings

## File Organization

### Directory Structure

```
app/
├── components/          # Reusable UI components
├── features/           # Feature-specific code
├── lib/               # Utility functions and helpers
├── auth/              # Authentication-related code
├── routes/            # Route components
└── root.tsx           # Root component
```

### File Naming

- Use descriptive file names
- Group related files in directories
- Use index files for clean imports
- Separate concerns (actions, schemas, components)

## Code Quality

### ESLint Rules

- Use strict TypeScript rules
- Enforce React best practices
- Include accessibility rules
- Use import sorting

### Prettier Configuration

- Use consistent formatting
- Include Tailwind CSS class sorting
- Use 2-space indentation
- Use semicolons

## Performance

### React Optimization

- Do not use memoization unless it is proven necessary with benchmarks
- Implement proper key props for lists
- Fix slow renders before worrying about re-renders
- Use lazy loading for routes

### Bundle Optimization

- Use code splitting
- Optimize images and assets
- Minimize bundle size
- Use proper caching strategies

## Accessibility

### ARIA Guidelines

- Use semantic HTML elements
- Include proper ARIA labels
- Provide alternative text for images
- Ensure keyboard navigation works

### Color and Contrast

- Use sufficient color contrast
- Don't rely solely on color for information
- Support dark mode preferences
- Test with screen readers

## Documentation

### Code Comments

- Write clear, concise comments
- Document complex business logic
- Include JSDoc for public APIs
- Explain "why" not "what"

### Component Documentation

- Use Storybook for component documentation
- Include usage examples
- Document prop types and variants
- Show accessibility considerations

## Error Handling

### Error Boundaries

- Implement React error boundaries
- Provide fallback UI for errors
- Log errors appropriately
- Handle network errors gracefully

### Form Validation

- Provide immediate feedback
- Show clear error messages
- Prevent form submission on errors
- Include server-side validation

## State Management

### Local State

- Use React hooks for local state
- Keep state as close to usage as possible
- Use appropriate state types
- Avoid prop drilling

### Server State

- Use React Router for server state
- Implement proper loading states
- Handle error states gracefully
- Use optimistic updates when appropriate
