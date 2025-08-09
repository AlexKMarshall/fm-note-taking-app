import type { Meta, StoryObj } from '@storybook/react-vite'

import { FloatingIconButton } from './floating-icon-button'

const meta = {
  title: 'FloatingIconButton',
  component: FloatingIconButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Add Note',
    icon: 'icon-plus',
    variant: 'primary',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FloatingIconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
