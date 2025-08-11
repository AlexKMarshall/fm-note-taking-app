/* eslint-disable react-hooks/rules-of-hooks */ // This isn't a react component file, rules of hooks don't apply here
import { faker } from '@faker-js/faker'
import { expect, test as testBase } from '@playwright/test'
import setCookieParser from 'set-cookie-parser'
import { type PlatformProxy, getPlatformProxy } from 'wrangler'
import { NoteRepository, NoteService } from '~/features/note/note-service'
import { UserRepository, UserService } from '~/features/user/user-service'
import { createSessionCookie } from '../app/session.server'
import { type Database, getDatabase } from '../database'
import { LoginPageObjectModel } from './object-models/login-page'
import { NotePageObjectModel } from './object-models/note-page'
import { SignupPageObjectModel } from './object-models/signup-page'
import { validatedTestEnvironment } from './test-environment'

type TestFixtures = {
  /**
   * Generate a user that can be used in the test
   */
  makeUser: (userOverrides?: Partial<{ email: string; password: string }>) => {
    email: string
    password: string
  }
  /**
   * Sign up a user that can be used in the test
   *
   */
  signupUser: (
    userOverrides?: Partial<{ email: string; password: string }>,
  ) => Promise<{ id: number; email: string; password: string }>
  /**
   * Login a user that can be used in the test
   */
  loginUser: (
    userOverrides?: Partial<{ email: string; password: string }>,
  ) => Promise<{ id: number; email: string; password: string }>
  signupPage: SignupPageObjectModel
  loginPage: LoginPageObjectModel
  makeNote: (
    noteOverrides?: Partial<{
      title: string | null
      tags: string[]
      content: string | null
    }>,
  ) => { title: string | null; tags: string[]; content: string | null }
  saveNote: (
    noteOverrides: Partial<{
      title: string | null
      tags: string[]
      content: string | null
    }> & { authorId: number },
  ) => Promise<{
    id: number
    title: string | null
    tags: string[]
    content: string | null
  }>
  notePage: NotePageObjectModel
}

type WorkerFixtures = {
  wrangler: PlatformProxy<Env>
  db: Database
}

export const test = testBase.extend<TestFixtures, WorkerFixtures>({
  wrangler: [
    async ({}, use) => {
      const wrangler = await getPlatformProxy<Env>()

      await use(wrangler)

      await wrangler.dispose()
    },
    { scope: 'worker', auto: true },
  ],
  db: [
    async ({ wrangler }, use) => {
      const db = getDatabase(wrangler.env.DB)
      await use(db)
    },
    { scope: 'worker' },
  ],
  makeUser: async ({}, use) => {
    await use((userOverrides) => {
      return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        ...userOverrides,
      }
    })
  },
  signupUser: async ({ db, makeUser }, use) => {
    const userService = new UserService(new UserRepository(db))
    await use(async (userOverrides) => {
      const user = makeUser(userOverrides)
      const savedUser = await userService.signup(user)
      return { ...savedUser, password: user.password }
    })
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPageObjectModel(page))
  },
  loginUser: async ({ signupUser, page }, use) => {
    await use(async (userOverrides) => {
      const user = await signupUser(userOverrides)
      const sessionCookie = createSessionCookie(validatedTestEnvironment)
      const cookieHeader = await sessionCookie.serialize({
        userId: user.id,
      })

      await page.context().addCookies([
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(setCookieParser.parseString(cookieHeader) as any),
          domain: 'localhost',
        },
      ])

      return user
    })
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPageObjectModel(page))
  },
  makeNote: async ({}, use) => {
    await use((noteOverrides) => {
      return {
        title: faker.lorem.sentence(),
        tags: [faker.lorem.word(), faker.lorem.word()],
        content: faker.lorem.paragraph(),
        ...noteOverrides,
      }
    })
  },
  saveNote: async ({ db, makeNote }, use) => {
    await use(async ({ authorId, ...noteOverrides }) => {
      const noteService = new NoteService(new NoteRepository(db))
      const note = await noteService.createNote({
        ...makeNote(noteOverrides),
        authorId,
      })
      return note
    })
  },
  notePage: async ({ page }, use) => {
    await use(new NotePageObjectModel(page, expect))
  },
})

export { expect } from '@playwright/test'
