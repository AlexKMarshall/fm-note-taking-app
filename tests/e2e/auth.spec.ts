import { faker } from '@faker-js/faker'
import { test, expect } from '../playwright-utilities'
import { users } from '~/database/schema'

test.describe('unauthenticated user', () => {
  test.use({ authStatus: 'unauthenticated' })

  test('homepage redirects to login if not authenticated', async ({
    page,
    db,
  }) => {
    // TODO explicitly don't have a session cookie (right now we just don't have one by default)
    await page.goto('/')

    // TODO: this is just here to verify we can manually interact with the db during a test
    // remove it once we've proven it works in ci
    const [manuallyInsertedTestUser] = await db
      .insert(users)
      .values({
        email: faker.internet.email(),
        passwordHash: faker.internet.password(),
      })
      .returning()

    console.log('manuallyInsertedTestUser', manuallyInsertedTestUser)

    await expect(
      page.getByRole('heading', { name: 'Welcome to Note' }),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
    await expect(page.url()).toContain('/login')
  })
})

test.describe('authenticated user', () => {
  test.use({ authStatus: 'authenticated' })

  test('homepage shows welcome message', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { name: 'Welcome to the Home Page' }),
    ).toBeVisible()
  })
})
