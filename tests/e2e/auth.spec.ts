import { test, expect } from '../playwright-utilities'

test.describe('unauthenticated user', () => {
  test.use({ authStatus: 'unauthenticated' })

  test('homepage redirects to login if not authenticated', async ({ page }) => {
    // TODO explicitly don't have a session cookie (right now we just don't have one by default)
    await page.goto('/')

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
