import { expect, test } from '../playwright-utilities'
import { NoteRepository, NoteService } from '~/features/note/note-service'

test('shows a note', async ({ page, loginUser, db }) => {
  const user = await loginUser()
  const noteService = new NoteService(new NoteRepository(db))
  const note = {
    title: 'Test Note',
    tags: ['test-tag', 'test-2-tag'],
    content: 'This is a note',
  }
  const savedNote = await noteService.createNote({
    ...note,
    authorId: user.id,
  })

  await page.goto(`/notes/${savedNote.id}`)

  await expect(page.getByText(note.title)).toBeVisible()
  await expect(page.getByText(note.content)).toBeVisible()
  for (const tag of note.tags) {
    await expect(page.getByText(tag)).toBeVisible()
  }
})
