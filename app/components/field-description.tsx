import type { ComponentProps } from 'react'

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
      className="text-xs text-gray-600 group-has-aria-invalid:hidden"
    >
      {children}
    </p>
  )
}
