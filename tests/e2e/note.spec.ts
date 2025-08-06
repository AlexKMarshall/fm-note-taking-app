import { inArray } from 'drizzle-orm'
import { expect, test } from '../playwright-utilities'
import { notes, notesToTags, tags } from '~/database/schema'

test.use({ authStatus: 'unauthenticated' })
test('shows a note', async ({ page, signupUser, loginPage, db }) => {
  const user = await signupUser()
  const note = {
    title: 'Test Note',
    tags: ['test-tag', 'test-2-tag'],
    content: 'This is a note',
  }

  const tagsThatAlreadyExist = await db.query.tags.findMany({
    where: inArray(tags.name, note.tags),
  })
  const newTags = note.tags.filter(
    (tag) => !tagsThatAlreadyExist.some((t) => t.name === tag),
  )

  if (newTags.length > 0) {
    await db
      .insert(tags)
      .values(newTags.map((tag) => ({ name: tag })))
      .returning()
  }
  const savedTags = await db.query.tags.findMany({
    where: inArray(tags.name, note.tags),
  })

  const savedNotes = await db
    .insert(notes)
    .values({ title: note.title, content: note.content, authorId: user.id })
    .returning({ id: notes.id })
  for (const savedNote of savedNotes) {
    for (const savedTag of savedTags) {
      await db
        .insert(notesToTags)
        .values({ noteId: savedNote.id, tagId: savedTag.id })
        .returning()
    }
  }

  const savedNote = savedNotes[0]
  if (!savedNote) {
    throw new Error('Note not saved')
  }

  await loginPage.goto()
  await loginPage.login(user)

  await expect(
    page.getByRole('heading', { name: 'Welcome to the Home Page' }),
  ).toBeVisible()
  await page.goto(`/notes/${savedNote.id}`)

  await expect(page.getByText(note.title)).toBeVisible()
  await expect(page.getByText(note.content)).toBeVisible()
  for (const tag of note.tags) {
    await expect(page.getByText(tag)).toBeVisible()
  }
})
