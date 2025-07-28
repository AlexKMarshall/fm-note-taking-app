import type { ComponentProps } from 'react'

export function Field({
  children,
  ...props
}: Omit<ComponentProps<'div'>, 'className'>) {
  return (
    <div {...props} className="group flex flex-col gap-2.5">
      {children}
    </div>
  )
}
