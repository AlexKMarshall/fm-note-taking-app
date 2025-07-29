import { createCookie, createCookieSessionStorage } from 'react-router'
import * as v from 'valibot'
import { transformEmptyStringToUndefined } from './lib/validation'

// TODO: how can we make this validated at runtime and still keep the convenience of the session methods
type SessionData = {
  userId: number
}

export function createSessionStorage(
  env: { SESSION_SECRET: string },
  request?: Request,
) {
  const SESSION_SECRET = v.parse(
    v.pipe(
      v.unknown(),
      transformEmptyStringToUndefined,
      v.string('SESSION_SECRET environment variable missing'),
    ),
    env.SESSION_SECRET,
  )

  // Determine if we're in production based on the request URL
  // In development, we're typically on localhost
  // In production, we're on the Cloudflare domain
  const isProduction = request
    ? !request.url.includes('localhost') && !request.url.includes('127.0.0.1')
    : false

  return createCookieSessionStorage<SessionData>({
    cookie: createCookie('session', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [SESSION_SECRET],
      secure: isProduction,
    }),
  })
}
