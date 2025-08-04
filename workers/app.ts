import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'
import { createRequestHandler } from 'react-router'
import * as schema from '../database/schema'
import {
  type SessionStorage,
  createSessionStorage,
} from '../app/session.server'
import {
  validateEnvironment,
  type EnvironmentData,
} from '../app/environment.server'

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: Env
      ctx: ExecutionContext
    }
    db: DrizzleD1Database<typeof schema>
    sessionStorage: SessionStorage
  }
}

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE,
)

export default {
  async fetch(request, env, ctx) {
    const db = drizzle(env.DB, { schema })
    const validatedEnvironment = validateEnvironment(env)
    const sessionStorage = createSessionStorage(validatedEnvironment)

    return requestHandler(request, {
      cloudflare: { env, ctx },
      db,
      environment: validatedEnvironment,
      sessionStorage,
    })
  },
} satisfies ExportedHandler<Env>
