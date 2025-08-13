import { Outlet } from 'react-router'

import type { Route } from './+types/layout'
import { RouteGroupLayout } from '~/components/route-group-layout'
import { ButtonLink } from '~/components/button'
import { NoteService } from '~/features/note/note-service'
import { NoteRepository } from '~/features/note/note-service'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'
import { formatDate } from '~/lib/date'
import { NoteLinks } from '~/features/note/note-links'

export async function loader({ request, context }: Route.LoaderArgs) {
  const { userId } = await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })
  const noteService = new NoteService(new NoteRepository(context.db))
  const notes = await noteService.getArchivedNotesByAuthor({ authorId: userId })

  return {
    archivedNotes: notes.map((note) => ({
      id: note.id,
      title: note.title,
      tags: note.tags,
      lastEdited: formatDate(note.updatedAt),
    })),
  }
}

export default function ArchivedLayout({ loaderData }: Route.ComponentProps) {
  const { archivedNotes } = loaderData
  return (
    <RouteGroupLayout
      heading="Archived Notes"
      sidebar={
        <>
          <ButtonLink to="/notes/new" variant="primary">
            + Create New Note
          </ButtonLink>
          <p className="text-sm text-pretty text-gray-700">
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </p>
          <NoteLinks notes={archivedNotes} />
        </>
      }
    >
      <Outlet />
    </RouteGroupLayout>
  )
}
