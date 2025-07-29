import { createCookie, createCookieSessionStorage } from 'react-router'
import * as v from 'valibot'
import { transformEmptyStringToUndefined } from './lib/validation'

// TODO: how can we make this validated at runtime and still keep the convenience of the session methods
type SessionData = {
  userId: number
}

export function createSessionStorage(env: {
  SESSION_SECRET: string
  ENVIRONMENT: string
}) {
  const SESSION_SECRET = v.parse(
    v.pipe(
      v.unknown(),
      transformEmptyStringToUndefined,
      v.string('SESSION_SECRET environment variable missing'),
    ),
    env.SESSION_SECRET,
  )

  const isProduction = env.ENVIRONMENT === 'production'

  return createCookieSessionStorage<SessionData>({
    cookie: createCookie('session', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [SESSION_SECRET],
      secure: isProduction,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    }),
  })
}
