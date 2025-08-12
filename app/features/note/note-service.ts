import { and, eq, inArray } from 'drizzle-orm'
import type { Database } from '~/database/index'
import {
  notes as notesTable,
  tags as tagsTable,
  notesToTags as notesToTagsTable,
} from '~/database/schema'

type CreateNoteDto = {
  authorId: number
  title: string | null
  tags: string[]
  content: string | null
}

type Note = {
  id: number
  title: string | null
  tags: string[]
  content: string | null
  updatedAt: string
  isArchived: boolean
}

export interface INoteService {
  createNote(createNoteDto: CreateNoteDto): Promise<Note>
  getNotesByAuthor(getNotesDto: { authorId: number }): Promise<Note[]>
  getArchivedNotesByAuthor(getNotesDto: { authorId: number }): Promise<Note[]>
  archiveNote(archiveDto: { noteId: number; authorId: number }): Promise<void>
  deleteNote(deleteDto: { noteId: number; authorId: number }): Promise<void>
}

export class NoteService implements INoteService {
  constructor(private readonly noteRepository: INoteRepository) {}

  async createNote(createNoteDto: CreateNoteDto) {
    return this.noteRepository.create(createNoteDto)
  }
  async getNotesByAuthor({ authorId }: { authorId: number }) {
    return this.noteRepository.getNotesByAuthor({ authorId, isArchived: false })
  }
  async getArchivedNotesByAuthor({ authorId }: { authorId: number }) {
    return this.noteRepository.getNotesByAuthor({ authorId, isArchived: true })
  }
  async archiveNote(archiveDto: { noteId: number; authorId: number }) {
    return this.noteRepository.archiveNote(archiveDto)
  }
  async deleteNote(deleteDto: { noteId: number; authorId: number }) {
    return this.noteRepository.deleteNote(deleteDto)
  }
}

export interface INoteRepository {
  create(createNoteDto: CreateNoteDto): Promise<Note>
  get(getDto: { noteId: number; authorId: number }): Promise<Note | null>
  getNotesByAuthor(getNotesDto: {
    authorId: number
    isArchived: boolean
  }): Promise<Note[]>
  archiveNote(archiveDto: { noteId: number; authorId: number }): Promise<void>
  deleteNote(deleteDto: { noteId: number; authorId: number }): Promise<void>
}

export class NoteRepository implements INoteRepository {
  constructor(private readonly db: Database) {}

  async get({ noteId, authorId }: { noteId: number; authorId: number }) {
    const note = await this.db.query.notes.findFirst({
      where: and(eq(notesTable.id, noteId), eq(notesTable.authorId, authorId)),
      columns: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        isArchived: true,
      },
      with: {
        notesToTags: {
          columns: {},
          with: {
            tag: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (!note) {
      return null
    }
    const { notesToTags, ...restNote } = note
    return { ...restNote, tags: notesToTags.map((t) => t.tag.name) }
  }

  async getNotesByAuthor({
    authorId,
    isArchived,
  }: {
    authorId: number
    isArchived: boolean
  }) {
    const notes = await this.db.query.notes.findMany({
      where: and(
        eq(notesTable.authorId, authorId),
        eq(notesTable.isArchived, isArchived),
      ),
      columns: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        isArchived: true,
      },
      with: {
        notesToTags: {
          columns: {},
          with: {
            tag: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    })

    return notes.map((note) => {
      const { notesToTags, ...restNote } = note
      return { ...restNote, tags: notesToTags.map((t) => t.tag.name) }
    })
  }

  async create({ tags, ...createNoteDto }: CreateNoteDto) {
    const existingTags = await this.db.query.tags.findMany({
      where: inArray(tagsTable.name, tags),
    })
    const tagsToCreate = tags.filter(
      (tag) => !existingTags.some((t) => t.name === tag),
    )

    const newTags =
      tagsToCreate.length > 0
        ? await this.db
            .insert(tagsTable)
            .values(tagsToCreate.map((tag) => ({ name: tag })))
            .returning()
        : []

    const tagsForNote = [...existingTags, ...newTags]

    const now = new Date().toISOString()
    const [note] = await this.db
      .insert(notesTable)
      .values({ ...createNoteDto, updatedAt: now, createdAt: now })
      .returning()
    if (!note) {
      throw new Error('Failed to create note')
    }
    await this.db
      .insert(notesToTagsTable)
      .values(tagsForNote.map((tag) => ({ noteId: note.id, tagId: tag.id })))

    const noteToReturn = await this.get({
      noteId: note.id,
      authorId: createNoteDto.authorId,
    })
    if (!noteToReturn) {
      throw new Error('Failed to create note')
    }
    return noteToReturn
  }

  async archiveNote({
    noteId,
    authorId,
  }: {
    noteId: number
    authorId: number
  }) {
    await this.db
      .update(notesTable)
      .set({ isArchived: true })
      .where(and(eq(notesTable.id, noteId), eq(notesTable.authorId, authorId)))
  }

  async deleteNote({ noteId, authorId }: { noteId: number; authorId: number }) {
    await this.db
      .delete(notesTable)
      .where(and(eq(notesTable.id, noteId), eq(notesTable.authorId, authorId)))
  }
}
