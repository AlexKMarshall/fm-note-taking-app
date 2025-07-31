/* eslint-disable react-hooks/rules-of-hooks */ // This isn't a react component file, rules of hooks don't apply here
import { test as testBase } from '@playwright/test'
import setCookieParser from 'set-cookie-parser'
import { createSessionCookie } from '../app/session.server'
import { validatedTestEnvironment } from './test-environment'

type TestOptions = {
  /** Is the test user authenticated?
   *
   * @default 'authenticated'
   */
  authStatus: 'authenticated' | 'unauthenticated'
}

export const test = testBase.extend<TestOptions>({
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
})

export { expect } from '@playwright/test'
