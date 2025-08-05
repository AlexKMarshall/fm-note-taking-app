import { type Page } from '@playwright/test'

export class SignupPageObjectModel {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/signup')
  }

  get emailField() {
    return this.page.getByRole('textbox', { name: 'Email' })
  }

  get passwordField() {
    return this.page.getByLabel('Password', { exact: true })
  }

  get signupButton() {
    return this.page.getByRole('button', { name: 'Sign Up' })
  }

  async signup(user: { email: string; password: string }) {
    await this.emailField.fill(user.email)
    await this.passwordField.fill(user.password)
    await this.signupButton.click()
  }
}
