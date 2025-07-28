import type { ComponentProps } from 'react'

/**
 * Accessible error message for a field. It is hidden when the field is valid.
 */
export function FieldError({
  errors = [],
  ...props
}: Omit<ComponentProps<'p'>, 'className' | 'children'> & {
  errors?: string[]
}) {
  return (
    <p
      {...props}
      // We hide with sr-only so that the container is still in the DOM and so the live region will be announced when errors are added to it
      className="flex flex-col text-xs text-red-500 empty:sr-only"
      role="alert"
    >
      {errors.map((error) => (
        <span key={error}>{error}</span>
      ))}
    </p>
  )
}
