import { Fragment, type ComponentProps } from 'react'
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
      className="grid grid-cols-[auto_1fr] gap-x-2 text-xs text-red-500 empty:sr-only"
      role="alert"
    >
      {errors.map((error) => (
        <Fragment key={error}>
          <Icon name="icon-info" className="size-4 not-first:hidden" />
          <span className="col-start-2">{error}</span>
        </Fragment>
      ))}
    </p>
  )
}
