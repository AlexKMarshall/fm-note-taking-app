import { expect, test } from '../playwright-utilities'

test('shows a note', async ({ loginUser, saveNote, notePage }) => {
  const user = await loginUser()

  const savedNote = await saveNote({ authorId: user.id })

  await notePage.goto(savedNote.id)

  await expect(notePage.title).toHaveText(savedNote.title ?? '')

  await expect(notePage.content).toHaveText(savedNote.content ?? '')

  for (const tag of savedNote.tags) {
    await expect(notePage.tags).toContainText(tag)
  }
})

test('create a note', async ({ page, loginUser, makeNote, notePage }) => {
  await loginUser()

  const note = makeNote()

  await page.goto('/notes/new')

  await page.getByLabel('Title').fill(note.title ?? '')
  await page.getByLabel('Tags').fill(note.tags.join(','))
  await page.getByLabel('Content').fill(note.content ?? '')

  await page.getByRole('button', { name: 'Save' }).click()

  await expect(notePage.title).toHaveText(note.title ?? '')

  await expect(notePage.content).toHaveText(note.content ?? '')

  for (const tag of note.tags) {
    await expect(notePage.tags).toContainText(tag)
  }
})

test('show all notes', async ({ page, loginUser, saveNote, notePage }) => {
  const user = await loginUser()
  const savedNoteOne = await saveNote({ authorId: user.id })
  const savedNoteTwo = await saveNote({ authorId: user.id })

  await page.goto('/notes')

  await expect(
    page.getByRole('link', { name: savedNoteOne.title ?? '' }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: savedNoteTwo.title ?? '' }),
  ).toBeVisible()

  await page.getByRole('link', { name: savedNoteOne.title ?? '' }).click()

  await expect(notePage.title).toHaveText(savedNoteOne.title ?? '')
})

test('delete a note', async ({ loginUser, saveNote, notePage }) => {
  const user = await loginUser()
  const savedNote = await saveNote({ authorId: user.id })

  await notePage.goto(savedNote.id)

  await notePage.deleteNote()

  await expect(notePage.note).toBeHidden()
})
