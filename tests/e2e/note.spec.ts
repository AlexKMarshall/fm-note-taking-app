import { expect, test } from '../playwright-utilities'

test('shows a note', async ({ page, loginUser, saveNote }) => {
  const user = await loginUser()

  const savedNote = await saveNote({ authorId: user.id })

  await page.goto(`/notes/${savedNote.id}`)

  const noteDisplay = page.getByTestId('note-display')

  await expect(
    noteDisplay.getByRole('heading', { name: savedNote.title ?? '' }),
  ).toBeVisible()
  await expect(noteDisplay.getByText(savedNote.content ?? '')).toBeVisible()
  for (const tag of savedNote.tags) {
    await expect(noteDisplay.getByText(tag)).toBeVisible()
  }
})

test('create a note', async ({ page, loginUser, makeNote }) => {
  await loginUser()

  const note = makeNote()

  await page.goto('/notes/new')

  await page.getByLabel('Title').fill(note.title ?? '')
  await page.getByLabel('Tags').fill(note.tags.join(','))
  await page.getByLabel('Content').fill(note.content ?? '')

  await page.getByRole('button', { name: 'Save' }).click()

  const noteDisplay = page.getByTestId('note-display')

  await expect(
    noteDisplay.getByRole('heading', { name: note.title ?? '' }),
  ).toBeVisible()
  await expect(noteDisplay.getByText(note.content ?? '')).toBeVisible()
  for (const tag of note.tags) {
    await expect(noteDisplay.getByText(tag)).toBeVisible()
  }
})

test('show all notes', async ({ page, loginUser, saveNote }) => {
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

  const noteDisplay = page.getByTestId('note-display')

  await expect(
    noteDisplay.getByRole('heading', { name: savedNoteOne.title ?? '' }),
  ).toBeVisible()
})
