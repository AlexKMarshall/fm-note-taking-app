import type { ComponentProps } from 'react'
import { Icon } from './icon'

/**
 * An accessible description for a field. It is hidden when the field is invalid with the expectation that an error message will be shown instead
 */
export function FieldDescription({
  children,
  ...props
}: Omit<ComponentProps<'p'>, 'className'>) {
  return (
    <p
      {...props}
      className="flex gap-2 text-xs text-gray-600 group-has-aria-invalid:hidden"
    >
      <Icon name="icon-info" className="size-4" />
      {children}
    </p>
  )
}
