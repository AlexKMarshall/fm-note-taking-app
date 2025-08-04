import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from './schema'

export type Database = DrizzleD1Database<typeof schema>

export function getDatabase(db: D1Database) {
  return drizzle(db, { schema })
}
