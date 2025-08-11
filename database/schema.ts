import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core'

export const guestBook = sqliteTable('guestBook', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
})

export const users = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}))

export const notes = sqliteTable('notes', {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text(),
  content: text(),
  authorId: integer()
    .references(() => users.id)
    .notNull(),
  createdAt: text()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

export const notesRelations = relations(notes, ({ one, many }) => ({
  author: one(users, {
    fields: [notes.authorId],
    references: [users.id],
  }),
  notesToTags: many(notesToTags),
}))

export const tags = sqliteTable('tags', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
})

export const tagsRelations = relations(tags, ({ many }) => ({
  notesToTags: many(notesToTags),
}))

export const notesToTags = sqliteTable(
  'notesToTags',
  {
    noteId: integer()
      .references(() => notes.id, { onDelete: 'cascade' })
      .notNull(),
    tagId: integer()
      .references(() => tags.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.noteId, table.tagId] })],
)

export const notesToTagsRelations = relations(notesToTags, ({ one }) => ({
  note: one(notes, {
    fields: [notesToTags.noteId],
    references: [notes.id],
  }),
  tag: one(tags, {
    fields: [notesToTags.tagId],
    references: [tags.id],
  }),
}))
