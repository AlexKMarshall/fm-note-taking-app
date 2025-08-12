import type { ReactNode } from 'react'
import { Stack } from './stack'

export function RouteGroupLayout({
  heading,
  sidebar,
  children,
}: {
  heading: ReactNode
  sidebar: ReactNode
  children: ReactNode
}) {
  return (
    <main className="flex flex-1 flex-col rounded-t-xl bg-white lg:rounded-none">
      <div className="border-b border-b-gray-200 p-8 max-lg:hidden">
        <h1 className="text-2xl font-bold text-gray-950">{heading}</h1>
      </div>
      <div className="grid flex-1 lg:grid-cols-[minmax(auto,17rem)_1fr]">
        <Stack
          gap="gap-4"
          className="border-r border-gray-200 py-5 pr-4 pl-8 max-lg:hidden"
        >
          {sidebar}
        </Stack>
        {children}
      </div>
    </main>
  )
}
