import type { ReactNode } from 'react'

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-gray-200 px-1.5 py-0.5 text-xs text-gray-950">
      {children}
    </span>
  )
}
