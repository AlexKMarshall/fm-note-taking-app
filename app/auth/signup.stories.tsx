import type { Meta, StoryObj } from '@storybook/react-vite'
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
  tags: ['autodocs'],
} satisfies Meta<typeof SignupRoute>

export default meta

export const Default: StoryObj<typeof meta> = {}

export const SubmitForm: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
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
