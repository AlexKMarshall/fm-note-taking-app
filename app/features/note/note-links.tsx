import { Fragment } from 'react'
import { NoteLink } from './note-link'
import { Stack } from '~/components/stack'
import { Separator } from '~/components/separator'

export function NoteLinks({
  notes,
}: {
  notes: Array<{
    id: number
    title?: string | null
    tags?: string[]
    lastEdited?: string
  }>
}) {
  return (
    <Stack gap="gap-1">
      {notes.map((note) => (
        <Fragment key={note.id}>
          <NoteLink to={`/notes/${note.id}`} note={note} />
          <Separator orientation="horizontal" className="last:hidden" />
        </Fragment>
      ))}
    </Stack>
  )
}
