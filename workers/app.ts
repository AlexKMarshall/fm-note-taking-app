import { createRequestHandler } from 'react-router'
import {
  validateEnvironment,
  type EnvironmentData,
} from '../app/environment.server'
import {
  createSessionStorage,
  type SessionStorage,
} from '../app/session.server'
import { getDatabase, type Database } from '../database'

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: Env
      ctx: ExecutionContext
    }
    db: Database
    environment: EnvironmentData
    sessionStorage: SessionStorage
  }
}

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE,
)

export default {
  async fetch(request, env, ctx) {
    const db = getDatabase(env.DB)
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
