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
}

export interface INoteService {
  createNote(createNoteDto: CreateNoteDto): Promise<Note>
}

export class NoteService implements INoteService {
  constructor(private readonly noteRepository: INoteRepository) {}

  async createNote(createNoteDto: CreateNoteDto) {
    return this.noteRepository.create(createNoteDto)
  }
}

export interface INoteRepository {
  create(createNoteDto: CreateNoteDto): Promise<Note>
  get(getDto: { noteId: number; authorId: number }): Promise<Note | null>
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
}
