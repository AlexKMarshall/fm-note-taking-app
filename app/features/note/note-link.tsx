import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import { Badge } from '~/components/badge'

export function NoteLink({
  to,
  note: { title = 'Untitled', tags = [], lastUpdated },
}: Pick<ComponentProps<typeof Link>, 'to'> & {
  note: {
    title?: string | null
    tags?: string[]
    lastUpdated?: string
  }
}) {
  return (
    <Link to={to} className="flex flex-col gap-3 p-2">
      <span className="font-semibold text-gray-950">{title}</span>
      <div className="flex flex-wrap gap-1 empty:hidden">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <span className="text-sm text-gray-500 empty:hidden">{lastUpdated}</span>
    </Link>
  )
}
