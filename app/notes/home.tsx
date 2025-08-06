import type { Route } from './+types/home'
import { requireUser } from '~/lib/require-user.server'

export async function loader({ context, request }: Route.LoaderArgs) {
  await requireUser({
    request,
    sessionStorage: context.sessionStorage,
  })

  return null
}

export default function NotesHome() {
  return <div>Notes home</div>
}
