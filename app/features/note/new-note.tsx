import { Icon } from '~/components/icon'
import { Separator } from '~/components/separator'
import { Stack } from '~/components/stack'

export function NewNote() {
  return (
    <form>
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
          type="text"
          aria-label="Title"
          placeholder="Enter a title..."
          name="title"
          className="text-2xl font-bold text-gray-950"
        />
        <div className="grid grid-cols-[minmax(auto,7rem)_1fr] gap-x-2 gap-y-1 text-xs text-gray-700 md:gap-y-2">
          <label htmlFor="tags" className="flex items-center gap-2 py-1">
            <Icon name="icon-tag" className="size-4" />
            Tags
          </label>
          <input
            name="tags"
            className="py-1"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            id="tags"
          />
          <div className="flex gap-2 py-1">
            <Icon name="icon-clock" className="size-4" />
            Last edited
          </div>
          <div className="py-1">Not yet saved</div>
        </div>
        <Separator orientation="horizontal" />
        <textarea
          name="content"
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
    </form>
  )
}
