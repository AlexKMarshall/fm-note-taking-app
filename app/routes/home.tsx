import type { Route } from './+types/home'
import { requireUser } from '~/lib/require-user.server'

export async function loader({ context, request }: Route.LoaderArgs) {
  const { userId } = await requireUser({
    request,
    sessionStorage: context.sessionStorage,
  })

  return { userId }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>You are logged in as user ID: {userId}</p>
    </div>
  )
}
