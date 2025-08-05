import { expect, test } from '../playwright-utilities'

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

  test('signup with unused email', async ({ page, makeUser, signupPage }) => {
    const user = makeUser()

    await signupPage.goto()
    await signupPage.signup(user)

    await expect(
      page.getByRole('heading', { name: 'Welcome to the Home Page' }),
    ).toBeVisible()
  })

  test('attempt signup with used email', async ({
    page,
    signupUser,
    signupPage,
  }) => {
    const user = await signupUser()

    await signupPage.goto()
    await signupPage.signup(user)

    await expect(page.getByText('Email is already used')).toBeVisible()
  })

  test('login with valid credentials', async ({
    page,
    signupUser,
    loginPage,
  }) => {
    const user = await signupUser()

    await loginPage.goto()

    await loginPage.login(user)

    await expect(
      page.getByRole('heading', { name: 'Welcome to the Home Page' }),
    ).toBeVisible()
  })

  test('login with incorrect password', async ({
    page,
    signupUser,
    loginPage,
  }) => {
    const user = await signupUser()

    await loginPage.goto()

    await loginPage.login({ ...user, password: 'incorrect' })

    await expect(page.getByText('Invalid email or password')).toBeVisible()
  })

  test('login with incorrect email', async ({
    page,
    signupUser,
    loginPage,
  }) => {
    const user = await signupUser()

    await loginPage.goto()
    await loginPage.login({ ...user, email: 'incorrect@example.com' })

    await expect(page.getByText('Invalid email or password')).toBeVisible()
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
