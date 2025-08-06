import type { Route } from './+types/home'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'

export async function loader({ context, request }: Route.LoaderArgs) {
  await requireAuthenticatedUser({
    request,
    sessionStorage: context.sessionStorage,
  })

  return null
}

export default function NotesHome() {
  return <div>Notes home</div>
}
