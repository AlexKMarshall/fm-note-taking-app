import type { Page, Expect } from '@playwright/test'

export class NotePageObjectModel {
  constructor(
    private page: Page,
    private expect: Expect,
  ) {}

  goto(noteId: number) {
    return this.page.goto(`/notes/${noteId}`)
  }

  get note() {
    return this.page.getByTestId('note-display')
  }

  get title() {
    return this.note.getByRole('heading', { level: 1 })
  }

  get content() {
    return this.note.getByTestId('content')
  }

  get tags() {
    return this.note.getByTestId('tags')
  }

  async archiveNote() {
    await this.page.getByRole('button', { name: 'Archive note' }).click()
    const confirmationModal = this.page.getByRole('dialog', {
      name: 'Archive note',
    })
    await confirmationModal
      .getByRole('button', { name: /archive note/i })
      .click()
  }

  async deleteNote() {
    await this.page.getByRole('button', { name: 'Delete note' }).click()
    const confirmationModal = this.page.getByRole('dialog', {
      name: 'Delete note',
    })
    await confirmationModal
      .getByRole('button', { name: /delete note/i })
      .click()
    await this.expect(confirmationModal).toBeHidden()
  }
}
