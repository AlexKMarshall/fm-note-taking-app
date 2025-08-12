import { type ReactNode } from 'react'
import { NoteLinks } from './note-links'
import { ButtonLink } from '~/components/button'
import { RouteGroupLayout } from '~/components/route-group-layout'

export function NotesLayout({
  notes,
  children,
}: {
  notes: Array<{
    id: number
    title?: string | null
    tags?: string[]
    lastEdited?: string
  }>
  children: ReactNode
}) {
  return (
    <RouteGroupLayout
      heading="All Notes"
      sidebar={
        <>
          <ButtonLink to="/notes/new" variant="primary">
            + Create New Note
          </ButtonLink>
          <NoteLinks notes={notes} />
        </>
      }
    >
      {children}
    </RouteGroupLayout>
  )
}
