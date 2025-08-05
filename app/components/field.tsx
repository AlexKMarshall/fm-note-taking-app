import type { ComponentProps } from 'react'
import { Stack } from './stack'

export function Field({
  children,
  ...props
}: Omit<ComponentProps<'div'>, 'className'>) {
  return (
    <Stack {...props} gap="gap-1.5" className="group">
      {children}
    </Stack>
  )
}
