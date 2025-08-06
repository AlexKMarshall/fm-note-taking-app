import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { Icon } from '~/components/icon'
import { Separator } from '~/components/separator'
import { Stack } from '~/components/stack'

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
    <Stack
      gap="gap-3 md:gap-4"
      className="px-4 py-5 md:px-8 md:py-6 lg:px-6 lg:py-5"
    >
      <div className="border-b border-gray-200 pb-3 lg:hidden">
        Mobile header controls
      </div>
      <NoteTitle title={title} />
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
      <div className="text-sm whitespace-pre-line text-gray-800">{content}</div>
    </Stack>
  )
}

function NoteTitle({ title }: { title: string }) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'NoteTitle',
        onError: (error) => console.error(error),
      }}
    >
      <div className="isolate grid text-2xl font-bold text-gray-950 [grid-template-areas:'stacked'] *:[grid-area:stacked]">
        <PlainTextPlugin
          contentEditable={
            <ContentEditable
              className="z-10"
              aria-placeholder={title}
              placeholder={<div>{title}</div>}
              role="heading"
              aria-level={1}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  )
}
