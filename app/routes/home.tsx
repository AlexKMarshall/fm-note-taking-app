import type { Route } from './+types/home'
import { requireAuthenticatedUser } from '~/lib/require-authenticated-user.server'

export async function loader({ context, request }: Route.LoaderArgs) {
  const { userId } = await requireAuthenticatedUser({
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
      <p>This page should redirect away to the notes page</p>
    </div>
  )
}
