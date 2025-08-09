import type { ComponentProps } from 'react'
import { NavLink } from 'react-router'
import { Badge } from '~/components/badge'

export function NoteLink({
  to,
  note: { title, tags = [], lastEdited },
}: Pick<ComponentProps<typeof NavLink>, 'to'> & {
  note: {
    title?: string | null
    tags?: string[]
    lastEdited?: string
  }
}) {
  return (
    <NavLink
      to={to}
      className="flex flex-col gap-3 rounded-md p-2 focus-visible:outline-2 focus-visible:outline-gray-500 aria-[current]:bg-gray-100"
    >
      <span className="font-semibold text-gray-950">{title ?? 'Untitled'}</span>
      <div className="flex flex-wrap gap-1 empty:hidden">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <span className="text-sm text-gray-500 empty:hidden">{lastEdited}</span>
    </NavLink>
  )
}
