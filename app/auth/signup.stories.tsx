import type { Meta } from '@storybook/react-vite'
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router'
import { expect, userEvent, within, fn } from 'storybook/test'

import SignupRoute from './signup'

const mockAction = fn()

const meta = {
  title: 'Routes/Signup',
  component: SignupRoute,
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
} satisfies Meta<typeof SignupRoute>

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
    const signUpButton = canvas.getByRole('button', { name: 'Sign Up' })

    await userEvent.type(emailInput, email)
    await userEvent.type(passwordInput, password)
    await userEvent.click(signUpButton)
    await expect(mockAction).toHaveBeenCalled()
    await expect(mockAction).toHaveBeenCalledWith({
      email,
      password,
    })
  },
}

export const InvalidSubmission = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        action: async () => {
          return {
            result: 'error',
            payload: {
              email: 'invalid-email',
              password: 'short',
            },
            issues: {
              nested: {
                email: ['Invalid email address'],
                password: ['Password must be at least 8 characters long'],
              },
            },
          }
        },
      },
    }),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByRole('textbox', { name: 'Email Address' })
    const passwordInput = canvas.getByLabelText('Password')
    const signUpButton = canvas.getByRole('button', { name: 'Sign Up' })

    await userEvent.type(emailInput, 'invalid-email')
    await userEvent.type(passwordInput, 'short')
    await userEvent.click(signUpButton)

    await expect(emailInput).toBeInvalid()
    await expect(passwordInput).toBeInvalid()
    await expect(emailInput).toHaveAccessibleDescription(
      'Invalid email address',
    )
    await expect(passwordInput).toHaveAccessibleDescription(
      'Password must be at least 8 characters long',
    )
  },
}
