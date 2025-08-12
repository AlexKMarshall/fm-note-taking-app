import { eq, and } from 'drizzle-orm'
import { redirect } from 'react-router'
import * as v from 'valibot'
import { parseWithValibot } from '@conform-to/valibot'
import type { Route } from './+types/note'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'
import { Note } from '~/features/note/note'
import { notes } from '~/database/schema'
import { formatDate } from '~/lib/date'
import { NoteService, NoteRepository } from '~/features/note/note-service'

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
    lastEdited: formatDate(note.updatedAt),
  }

  return { note: formattedNote }
}

const NoteActionSchema = v.object({
  intent: v.union([v.literal('delete'), v.literal('archive')]),
})

export async function action({ context, request, params }: Route.ActionArgs) {
  const { userId } = await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })
  const noteId = Number(params.id)
  const formData = await request.formData()
  const submission = parseWithValibot(formData, { schema: NoteActionSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const noteService = new NoteService(new NoteRepository(context.db))
  if (submission.value.intent === 'delete') {
    try {
      await noteService.deleteNote({ noteId, authorId: userId })
      return redirect('/notes')
    } catch (error) {
      console.error(error)
      return submission.reply({
        formErrors: ['Something went wrong pleas try again later'],
      })
    }
  }

  if (submission.value.intent === 'archive') {
    try {
      await noteService.archiveNote({ noteId, authorId: userId })
      return redirect('/notes')
    } catch (error) {
      console.error(error)
      return submission.reply({
        formErrors: ['Something went wrong pleas try again later'],
      })
    }
  }
}

export default function NoteRoute({ loaderData }: Route.ComponentProps) {
  const { note } = loaderData

  return (
    <Note
      title={note.title ?? 'Untitled'}
      tags={note.tags}
      lastEdited={note.lastEdited}
      content={note.content ?? ''}
    />
  )
}
