import { redirect } from 'react-router'
import { type SessionStorage } from '~/session.server'

export async function requireAuthenticatedUser({
  request,
  sessionStorage,
}: {
  request: Request
  sessionStorage: SessionStorage
}) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  if (!userId) {
    throw redirect('/login')
  }

  return { userId }
}
