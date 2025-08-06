import { test, expect } from 'vitest'
import { requireUser } from './require-user.server'
import { createSessionStorage } from '~/session.server'

test('returns the user id for a valid session', async () => {
  const sessionStorage = createSessionStorage({
    SESSION_SECRET: 'test',
    ENVIRONMENT: 'test',
  })
  const session = await sessionStorage.getSession()
  session.set('userId', 1)

  const request = new Request('http://localhost/notes', {
    headers: {
      Cookie: await sessionStorage.commitSession(session),
    },
  })

  const result = await requireUser({ request, sessionStorage })

  expect(result).toEqual({ userId: 1 })
})

test('throws a redirect to login for a missing session', async () => {
  const sessionStorage = createSessionStorage({
    SESSION_SECRET: 'test',
    ENVIRONMENT: 'test',
  })
  const request = new Request('http://localhost/notes')

  await expect(requireUser({ request, sessionStorage })).rejects.toEqual(
    expect.objectContaining({
      status: 302,
    }),
  )
})
