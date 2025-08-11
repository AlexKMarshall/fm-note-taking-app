import { DeleteNoteModal } from './delete-note-modal'
import { Button } from '~/components/button'
import { Cluster } from '~/components/cluster'
import { Icon } from '~/components/icon'
import { IconButton } from '~/components/icon-button'
import { Separator } from '~/components/separator'
import { Stack } from '~/components/stack'
import { TextButtonLink } from '~/components/text-button'

export function Note({
  title,
  tags,
  lastEdited,
  content,
}: {
  title: string
  tags: string[]
  lastEdited: string
  content: string
}) {
  return (
    <div className="grid lg:grid-cols-[1fr_minmax(auto,16rem)]">
      <Stack
        gap="gap-3 md:gap-4"
        className="px-4 py-5 md:px-8 md:py-6 lg:px-6 lg:py-5"
        data-testid="note-display"
      >
        <div className="flex justify-between gap-4 lg:hidden">
          <TextButtonLink to="/notes" variant="secondary">
            <Icon name="icon-arrow-left" className="size-4" />
            Go back
          </TextButtonLink>
          <Cluster gap="gap-4">
            <DeleteNoteModal
              trigger={({ show }) => (
                <IconButton
                  icon="icon-delete"
                  label="Delete note"
                  onClick={show}
                />
              )}
            />
          </Cluster>
        </div>
        <Separator orientation="horizontal" className="lg:hidden" />
        <h1 className="text-2xl font-bold text-gray-950">{title}</h1>
        <div className="grid grid-cols-[minmax(auto,7rem)_1fr] gap-x-2 gap-y-1 text-xs text-gray-700 md:gap-y-2">
          <div className="flex items-center gap-2 py-1">
            <Icon name="icon-tag" className="size-4" />
            Tags
          </div>
          <div className="py-1">{tags.join(', ')}</div>
          <div className="flex gap-2 py-1">
            <Icon name="icon-clock" className="size-4" />
            Last edited
          </div>
          <div className="py-1">{lastEdited}</div>
        </div>
        <Separator orientation="horizontal" />
        <div className="text-sm whitespace-pre-line text-gray-800">
          {content}
        </div>
      </Stack>
      <Stack
        gap="gap-3"
        className="border-l border-gray-200 py-5 pr-8 pl-4 max-lg:hidden"
      >
        <DeleteNoteModal
          trigger={({ show }) => (
            <Button variant="border" onClick={show}>
              <Icon name="icon-delete" className="size-5" />
              Delete note
            </Button>
          )}
        />
      </Stack>
    </div>
  )
}
