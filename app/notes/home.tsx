import type { Route } from './+types/home'
import { Stack } from '~/components/stack'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'
import { NoteLinks } from '~/features/note/note-links'
import { NoteRepository, NoteService } from '~/features/note/note-service'
import { formatDate } from '~/lib/date'

export async function loader({ context, request }: Route.LoaderArgs) {
  const { userId } = await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })
  // TODO: see if we can just use the already fetched notes from the layout loader
  const noteService = new NoteService(new NoteRepository(context.db))
  const notes = await noteService.getNotesByAuthor({ authorId: userId })

  return {
    notes: notes.map((note) => ({
      id: note.id,
      title: note.title,
      tags: note.tags,
      lastEdited: formatDate(note.updatedAt),
    })),
  }
}

export default function NotesHome({
  loaderData: { notes },
}: Route.ComponentProps) {
  return (
    <Stack gap="gap-4" className="px-4 py-5 md:px-8 md:py-6 lg:hidden">
      <h1 className="text-2xl font-bold text-gray-950">All Notes</h1>
      <NoteLinks notes={notes} />
    </Stack>
  )
}
