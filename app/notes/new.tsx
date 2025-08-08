import { Form, redirect } from 'react-router'
import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from '@conform-to/react'
import * as v from 'valibot'
import { parseWithValibot } from '@conform-to/valibot'
import type { Route } from './+types/new'
import { Icon } from '~/components/icon'
import { Separator } from '~/components/separator'
import { Stack } from '~/components/stack'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'
import { transformEmptyStringToUndefined } from '~/lib/validation'
import { NoteRepository, NoteService } from '~/features/note/note-service'

const TrimmedStringSchema = v.pipe(v.string(), v.trim())

const NewNoteSchema = v.object({
  title: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.optional(TrimmedStringSchema),
  ),
  tags: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.optional(TrimmedStringSchema),
  ),
  content: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.optional(TrimmedStringSchema),
  ),
})

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
  const submission = parseWithValibot(formData, { schema: NewNoteSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const noteService = new NoteService(new NoteRepository(context.db))

  const note = await noteService.createNote({
    title: submission.value.title,
    tags: submission.value.tags?.split(',').map((t) => t.trim()) ?? [],
    content: submission.value.content,
    authorId: userId,
  })

  return redirect(`/notes/${note.id}`)
}

export default function NoteRoute() {
  const [form, fields] = useForm({
    onValidate: ({ formData }) =>
      parseWithValibot(formData, { schema: NewNoteSchema }),
    shouldValidate: 'onSubmit',
  })
  return (
    <Form method="post" {...getFormProps(form)}>
      <Stack
        gap="gap-3 md:gap-4"
        className="min-h-screen px-4 py-5 md:px-8 md:py-6 lg:px-6 lg:py-5"
      >
        <div className="flex justify-between gap-4 border-b border-gray-200 pb-3 lg:hidden">
          <div>Go back placeholder</div>
          <button className="cursor-pointer text-blue-500" type="submit">
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
          aria-label="Note"
        />
        <div className="flex gap-4 border-t border-gray-200 pt-4 max-lg:hidden">
          <button
            className="cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-white"
            type="submit"
          >
            Save Note
          </button>
        </div>
      </Stack>
    </Form>
  )
}
