import type { Meta } from '@storybook/react-vite'
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router'
import { expect, userEvent, within, fn, waitFor } from 'storybook/test'

import LoginRoute from './login'
import { loginAction } from './_actions/login-action'

const mockAction = fn()

const meta = {
  title: 'Routes/Login',
  component: LoginRoute,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    reactRouter: reactRouterParameters({
      routing: {
        action: async ({ request }) => {
          const formData = await request.formData()
          const formDataObject = Object.fromEntries(formData)

          return mockAction(formDataObject)
        },
      },
    }),
  },
  args: {
    params: {},
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginRoute>

export default meta

export const Default = {}

// Typescript doesn't seem to infer the type of args correctly if we use StoryObj for route components that use the Route.ComponentProps type
// So using plain object with manual types where necessary
export const SubmitForm = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const email = 'test@example.com'
    const password = 's0meR4nd0mP455w0rd'

    const emailInput = canvas.getByRole('textbox', { name: 'Email Address' })
    // Input type="password" do not have an accessible role, so we use the label text
    const passwordInput = canvas.getByLabelText('Password')
    const loginButton = canvas.getByRole('button', { name: 'Login' })

    await userEvent.type(emailInput, email)
    await userEvent.type(passwordInput, password)
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(mockAction).toHaveBeenCalled()
    })
    expect(mockAction).toHaveBeenCalledWith({
      email,
      password,
    })
  },
}

export const InvalidSubmission = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        action: async ({ request }: { request: Request }) => {
          const formData = await request.formData()

          return loginAction(formData)
        },
      },
    }),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByRole('textbox', { name: 'Email Address' })
    const passwordInput = canvas.getByLabelText('Password')
    const loginButton = canvas.getByRole('button', { name: 'Login' })

    await userEvent.type(emailInput, 'invalid-email')
    await userEvent.clear(passwordInput)
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(emailInput).toHaveAccessibleDescription(
        'Please enter a valid email address',
      )
    })

    expect(passwordInput).toHaveAccessibleDescription('Please enter a password')
    expect(emailInput).toBeInvalid()
    expect(passwordInput).toBeInvalid()
  },
}
