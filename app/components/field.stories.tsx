import type { Meta, StoryObj } from '@storybook/react-vite'

import { within, expect } from 'storybook/test'
import { Field as FieldComponent } from './field'
import { Label } from './label'
import { Input } from './input'
import { FieldDescription } from './field-description'
import { FieldError } from './field-error'

const meta = {
  title: 'Field',
  component: FieldComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FieldComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Field: Story = {
  render: function Render() {
    return (
      <FieldComponent>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" />
      </FieldComponent>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Email Address' })
    await expect(input).toBeVisible()
    await expect(input).toBeValid()
  },
}

export const WithDescription: Story = {
  render: function Render() {
    return (
      <FieldComponent>
        <Label htmlFor="password">Password</Label>
        <Input id="password" aria-describedby="password-description" />
        <FieldDescription id="password-description">
          At least 8 characters
        </FieldDescription>
      </FieldComponent>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Password' })
    await expect(input).toBeVisible()
    await expect(input).toBeValid()
    await expect(input).toHaveAccessibleDescription('At least 8 characters')
  },
}

export const WithError: Story = {
  render: function Render() {
    return (
      <FieldComponent>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          aria-describedby="password-error"
          aria-invalid
          defaultValue="short"
        />
        <FieldDescription id="password-description">
          At least 8 characters
        </FieldDescription>
        <FieldError errors={['Password is too short']} id="password-error" />
      </FieldComponent>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Password' })
    await expect(input).toBeVisible()
    await expect(input).toBeInvalid()
    await expect(input).toHaveAccessibleDescription('Password is too short')
    // If a field is invalid, it does not have a description, only an error message
    await expect(input).not.toHaveAccessibleDescription('At least 8 characters')
  },
}
