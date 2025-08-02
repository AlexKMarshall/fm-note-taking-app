import type { Meta, StoryObj } from '@storybook/react-vite'

import { userEvent, within, expect } from 'storybook/test'
import { PasswordInput as PasswordInputComponent } from './password-input'

const meta = {
  title: 'PasswordInput',
  component: PasswordInputComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordInputComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ShowPassword: Story = {
  args: {
    placeholder: 'Enter your password',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Enter your password')
    await userEvent.type(input, 'my-password')
    await userEvent.click(canvas.getByRole('button', { name: 'Show password' }))
    await expect(input).toHaveAttribute('type', 'text')
  },
}

export const HidePassword: Story = {
  args: {
    placeholder: 'Enter your password',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Enter your password')
    await userEvent.type(input, 'my-password')
    await userEvent.click(canvas.getByRole('button', { name: 'Show password' }))
    await userEvent.click(canvas.getByRole('button', { name: 'Hide password' }))
    await expect(input).toHaveAttribute('type', 'password')
  },
}
