import type { Route } from './+types/home'

export async function loader({ context, request }: Route.LoaderArgs) {
  console.log('cloudflare env', context.cloudflare.env)
  console.log(
    'SESSION_SECRET from context:',
    context.cloudflare.env.SESSION_SECRET,
  )
  console.log('SESSION_SECRET from process.env:', process.env.SESSION_SECRET)

  // Test session functionality using context.sessionStorage
  console.log('=== SESSION TEST ===')
  console.log('Request cookies:', request.headers.get('Cookie'))

  const session = await context.sessionStorage.getSession(
    request.headers.get('Cookie'),
  )
  console.log('Session object:', session)
  console.log('Session data:', session.data)
  console.log('Session has data:', Object.keys(session.data).length > 0)
  console.log('Session is empty:', Object.keys(session.data).length === 0)
  console.log('=== END SESSION TEST ===')

  return null
}

export default function Home() {
  return <div>Home</div>
}
