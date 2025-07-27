import type { ComponentProps } from 'react'

export function Input(props: Omit<ComponentProps<'input'>, 'className'>) {
  return (
    <input
      {...props}
      className="rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-50 focus-visible:border-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
    />
  )
}
