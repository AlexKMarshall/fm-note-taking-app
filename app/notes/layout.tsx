import { Outlet, useLoaderData } from 'react-router'
import type { Route } from './+types/layout'
import { NoteRepository, NoteService } from '~/features/note/note-service'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'
import { NotesLayout } from '~/features/note/notes-layout'

export async function loader({ request, context }: Route.LoaderArgs) {
  const { userId } = await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })

  const noteService = new NoteService(new NoteRepository(context.db))
  const notes = await noteService.getNotesByAuthor({ authorId: userId })

  return {
    notes: notes.map((note) => ({
      id: note.id,
      title: note.title,
      tags: note.tags,
      lastEdited: new Date(note.updatedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    })),
  }
}

export default function NotesLayoutRoute() {
  const { notes } = useLoaderData<typeof loader>()
  return (
    <NotesLayout notes={notes}>
      <Outlet />
    </NotesLayout>
  )
}
