/* eslint-disable react-hooks/rules-of-hooks */ // This isn't a react component file, rules of hooks don't apply here
import { test as testBase } from '@playwright/test'
import { faker } from '@faker-js/faker'
import setCookieParser from 'set-cookie-parser'
import { type PlatformProxy, getPlatformProxy } from 'wrangler'
import { createSessionCookie } from '../app/session.server'
import { type Database, getDatabase } from '../database'
import { validatedTestEnvironment } from './test-environment'
import { UserRepository, UserService } from '~/features/user/user-service'

type TestFixtures = {
  /** Is the test user authenticated?
   *
   * @default 'authenticated'
   */
  authStatus: 'authenticated' | 'unauthenticated'
  /**
   * Register a user that can be used in the test
   *
   */
  signupUser: (
    userOverrides?: Partial<{ email: string; password: string }>,
  ) => Promise<{ id: number; email: string; password: string }>
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
  authStatus: 'authenticated',
  page: async ({ authStatus, page }, use) => {
    if (authStatus === 'authenticated') {
      // TODO: actually create a user in the database and use that id to create a session cookie
      // We'll create a mock session cookie and save it to the page
      const sessionCookie = createSessionCookie(validatedTestEnvironment)

      const cookieHeader = await sessionCookie.serialize({
        userId: 123,
      })

      await page.context().addCookies([
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(setCookieParser.parseString(cookieHeader) as any),
          domain: 'localhost',
        },
      ])
    }

    await use(page)
  },
  signupUser: async ({ db }, use) => {
    const userService = new UserService(new UserRepository(db))
    await use(async (userOverrides) => {
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        ...userOverrides,
      }
      const savedUser = await userService.signup(user)
      return { ...savedUser, password: user.password }
    })
  },
})

export { expect } from '@playwright/test'
