import { redirect } from 'react-router'
import type { Route } from './+types/home'

export async function loader({ context, request }: Route.LoaderArgs) {
  const session = await context.sessionStorage.getSession(
    request.headers.get('Cookie'),
  )

  // Check if user is authenticated
  const userId = session.get('userId')

  if (!userId) {
    // No session found, redirect to login
    throw redirect('/login')
  }

  // User is authenticated, return user data or whatever you need
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
