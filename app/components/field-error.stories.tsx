import type { Meta, StoryObj } from '@storybook/react-vite'

import { FieldError as FieldErrorComponent } from './field-error'

const meta = {
  title: 'FieldError',
  component: FieldErrorComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    errors: ['Invalid email address'],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FieldErrorComponent>

export default meta
type Story = StoryObj<typeof meta>

export const FieldError: Story = {}

export const MultipleErrors: Story = {
  args: {
    errors: ['Password is too short', 'Password must contain a number'],
  },
}
