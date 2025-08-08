import type { Route } from './+types/new'
import { NewNote } from '~/features/note/new-note'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'

export async function loader({ context, request }: Route.LoaderArgs) {
  await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })
  return null
}

export default function NoteRoute() {
  return <NewNote />
}
