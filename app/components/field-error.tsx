import type { ComponentProps } from 'react'
import { Icon } from './icon'

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
      className="flex gap-2 text-xs text-red-500 empty:sr-only"
      role="alert"
    >
      <Icon name="icon-info" className="size-4" />
      <span className="flex flex-col">
        {errors.map((error) => (
          <span key={error}>{error}</span>
        ))}
      </span>
    </p>
  )
}
