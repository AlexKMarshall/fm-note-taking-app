import { Fragment, type ReactNode } from 'react'
import { MobileFooter } from '~/components/mobile-footer'
import { MobileHeader } from '~/components/mobile-header'
import { Separator } from '~/components/separator'
import { Stack } from '~/components/stack'
import { NoteLink } from '~/features/note/note-link'

export function NotesLayout({
  notes,
  children,
}: {
  notes: Array<{
    id: number
    title?: string | null
    tags?: string[]
    lastEdited?: string
  }>
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 lg:bg-white">
      <MobileHeader />
      <main className="flex flex-1 flex-col rounded-t-xl bg-white lg:rounded-none">
        <div className="border-b border-b-gray-200 p-8 max-lg:hidden">
          <h1 className="text-2xl font-bold text-gray-950">All Notes</h1>
        </div>
        <div className="grid flex-1 lg:grid-cols-[minmax(auto,17rem)_1fr]">
          <div className="border-r border-gray-200 py-5 pr-4 pl-8 max-lg:hidden">
            <Stack gap="gap-1">
              {notes.map((note) => (
                <Fragment key={note.id}>
                  <NoteLink to={`/notes/${note.id}`} note={note} />
                  <Separator orientation="horizontal" className="last:hidden" />
                </Fragment>
              ))}
            </Stack>
          </div>
          {children}
        </div>
      </main>
      <MobileFooter />
    </div>
  )
}
