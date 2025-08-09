import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from '@conform-to/react'
import { parseWithValibot } from '@conform-to/valibot'
import { Form, redirect } from 'react-router'
import type { Route } from './+types/new'
import { Icon } from '~/components/icon'
import { Separator } from '~/components/separator'
import { Stack } from '~/components/stack'
import { CreateNoteSchema } from '~/features/note/_lib/create-note-schema'
import { NoteRepository, NoteService } from '~/features/note/note-service'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'
import { Button } from '~/components/button'

export async function loader({ context, request }: Route.LoaderArgs) {
  await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })
  return null
}

export async function action({ request, context }: Route.ActionArgs) {
  const { userId } = await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })
  const formData = await request.formData()
  const submission = parseWithValibot(formData, { schema: CreateNoteSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const noteService = new NoteService(new NoteRepository(context.db))

  const note = await noteService.createNote({
    title: submission.value.title ?? null,
    tags:
      submission.value.tags
        ?.split(',')
        .map((t) => t.trim())
        .filter(Boolean) ?? [],
    content: submission.value.content ?? null,
    authorId: userId,
  })

  return redirect(`/notes/${note.id}`)
}

export default function NoteRoute() {
  const [form, fields] = useForm({
    onValidate: ({ formData }) =>
      parseWithValibot(formData, { schema: CreateNoteSchema }),
    shouldValidate: 'onSubmit',
  })
  return (
    <Form method="post" {...getFormProps(form)}>
      <Stack
        gap="gap-3 md:gap-4"
        className="px-4 py-5 md:px-8 md:py-6 lg:px-6 lg:py-5"
      >
        <div className="flex justify-between gap-4 border-b border-gray-200 pb-3 lg:hidden">
          <div>Go back placeholder</div>
          <button
            className="cursor-pointer text-sm text-blue-500"
            type="submit"
          >
            Save Note
          </button>
        </div>
        <input
          {...getInputProps(fields.title, { type: 'text' })}
          aria-label="Title"
          placeholder="Enter a title..."
          className="text-2xl font-bold text-gray-950"
        />
        <div className="grid grid-cols-[minmax(auto,7rem)_1fr] gap-x-2 gap-y-1 text-xs text-gray-700 md:gap-y-2">
          <label
            htmlFor={fields.tags.id}
            className="flex items-center gap-2 py-1"
          >
            <Icon name="icon-tag" className="size-4" />
            Tags
          </label>
          <input
            {...getInputProps(fields.tags, { type: 'text' })}
            className="py-1"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
          />
          <div className="flex gap-2 py-1">
            <Icon name="icon-clock" className="size-4" />
            Last edited
          </div>
          <div className="py-1">Not yet saved</div>
        </div>
        <Separator orientation="horizontal" />
        <textarea
          {...getTextareaProps(fields.content)}
          className="min-h-80 grow-1 resize-none rounded-xs text-sm text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500"
          placeholder="Start typing your note here…"
          aria-label="Content"
        />
        <div className="flex gap-4 border-t border-gray-200 pt-4 max-lg:hidden">
          <Button variant="primary" type="submit">
            Save Note
          </Button>
        </div>
      </Stack>
    </Form>
  )
}
