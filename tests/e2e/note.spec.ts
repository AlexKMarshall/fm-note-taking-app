import { expect, test } from '../playwright-utilities'

test('shows a note', async ({ page, loginUser, saveNote }) => {
  const user = await loginUser()

  const savedNote = await saveNote({ authorId: user.id })

  await page.goto(`/notes/${savedNote.id}`)

  await expect(page.getByText(savedNote.title ?? '')).toBeVisible()
  await expect(page.getByText(savedNote.content ?? '')).toBeVisible()
  for (const tag of savedNote.tags) {
    await expect(page.getByText(tag)).toBeVisible()
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

  await expect(page.getByText(note.title ?? '')).toBeVisible()
  await expect(page.getByText(note.content ?? '')).toBeVisible()
  for (const tag of note.tags) {
    await expect(page.getByText(tag)).toBeVisible()
  }
})
