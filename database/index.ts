import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from './schema'

export type Database = DrizzleD1Database<typeof schema>

let databaseSingleton: Database | null = null

export function getDatabase(db: D1Database) {
  if (!databaseSingleton) {
    databaseSingleton = drizzle(db, { schema })
  }
  return databaseSingleton
}
