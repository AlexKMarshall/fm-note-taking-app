import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'
import { createRequestHandler } from 'react-router'
import * as schema from '../database/schema'
import { createSessionStorage } from '../app/session.server'

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: Env
      ctx: ExecutionContext
    }
    db: DrizzleD1Database<typeof schema>
    sessionStorage: ReturnType<typeof createSessionStorage>
  }
}

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE,
)

export default {
  async fetch(request, env, ctx) {
    const db = drizzle(env.DB, { schema })
    const sessionStorage = createSessionStorage(env, request)

    return requestHandler(request, {
      cloudflare: { env, ctx },
      db,
      sessionStorage,
    })
  },
} satisfies ExportedHandler<Env>
