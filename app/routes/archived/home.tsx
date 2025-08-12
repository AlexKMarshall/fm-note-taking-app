import type { Route } from './+types/home'
import { FloatingIconButtonLink } from '~/components/floating-icon-button'
import { Stack } from '~/components/stack'
import { NoteLinks } from '~/features/note/note-links'
import { NoteRepository, NoteService } from '~/features/note/note-service'
import { formatDate } from '~/lib/date'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'

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

export default function ArchivedHome({
  loaderData: { archivedNotes },
}: Route.ComponentProps) {
  return (
    <Stack gap="gap-4" className="relative px-4 py-5 md:px-8 md:py-6 lg:hidden">
      <h1 className="text-2xl font-bold text-gray-950">Archived Notes</h1>
      <p className="text-sm text-pretty text-gray-700">
        All your archived notes are stored here. You can restore or delete them
        anytime.
      </p>
      <NoteLinks notes={archivedNotes} />
      <FloatingIconButtonLink
        to="/notes/new"
        icon="icon-plus"
        label="Add Note"
        variant="primary"
        className="absolute right-4 bottom-4 md:right-8 md:bottom-8"
      />
    </Stack>
  )
}
