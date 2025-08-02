import { createCookie, createCookieSessionStorage } from 'react-router'
import { type EnvironmentData } from './environment.server'

// TODO: how can we make this validated at runtime and still keep the convenience of the session methods
type SessionData = {
  userId: number
}

export function createSessionCookie(
  env: Pick<EnvironmentData, 'SESSION_SECRET' | 'ENVIRONMENT'>,
) {
  return createCookie('session', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [env.SESSION_SECRET],
    secure: env.ENVIRONMENT === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export function createSessionStorage(
  env: Pick<EnvironmentData, 'SESSION_SECRET' | 'ENVIRONMENT'>,
) {
  return createCookieSessionStorage<SessionData>({
    cookie: createSessionCookie(env),
  })
}

export type SessionStorage = ReturnType<typeof createSessionStorage>
