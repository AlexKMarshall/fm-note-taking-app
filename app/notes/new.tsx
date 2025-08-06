import type { Route } from './+types/new'
import { Note } from '~/features/note/note'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'

export async function loader({ context, request }: Route.LoaderArgs) {
  await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })
  return null
}

export default function NoteRoute() {
  return (
    <Note title="Untitled" tags={[]} lastEdited="Not yet saved" content="" />
  )
}
