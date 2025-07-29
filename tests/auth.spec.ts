import { test, expect } from '@playwright/test'

test('login page loads', async ({ page }) => {
  await page.goto('/login')

  await expect(
    page.getByRole('heading', { name: 'Welcome to Note' }),
  ).toBeVisible()
})
