import { type Page } from '@playwright/test'

export class LoginPageObjectModel {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/login')
  }

  get emailField() {
    return this.page.getByRole('textbox', { name: 'Email' })
  }

  get passwordField() {
    return this.page.getByLabel('Password', { exact: true })
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' })
  }

  async login(user: { email: string; password: string }) {
    await this.emailField.fill(user.email)
    await this.passwordField.fill(user.password)
    await this.loginButton.click()
  }
}
