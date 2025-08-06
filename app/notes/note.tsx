import { eq, and } from 'drizzle-orm'
import { redirect } from 'react-router'
import type { Route } from './+types/note'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'
import { Note } from '~/features/note/note'
import { notes } from '~/database/schema'

export async function loader({ context, request, params }: Route.LoaderArgs) {
  const { userId } = await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })

  const note = await context.db.query.notes.findFirst({
    where: and(eq(notes.authorId, userId), eq(notes.id, Number(params.id))),
    columns: {
      id: true,
      title: true,
      content: true,
      updatedAt: true,
    },
    with: {
      notesToTags: {
        columns: {},
        with: {
          tag: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  if (!note) {
    throw redirect('/notes')
  }

  const formattedNote = {
    title: note.title,
    content: note.content,
    tags: note.notesToTags.map((noteToTag) => noteToTag.tag.name),
    lastEdited: new Date(note.updatedAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  }

  return { note: formattedNote }
}

export default function NoteRoute({ loaderData }: Route.ComponentProps) {
  const { note } = loaderData

  return (
    <Note
      title={note.title}
      tags={note.tags}
      lastEdited={note.lastEdited}
      content={note.content}
    />
  )
}
