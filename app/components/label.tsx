import type { ComponentProps } from 'react'

export function Label(props: Omit<ComponentProps<'label'>, 'className'>) {
  return <label {...props} className="text-sm font-medium text-gray-950" />
}
