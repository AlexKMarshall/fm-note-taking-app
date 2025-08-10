import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextButton } from './text-button'

const meta = {
  title: 'TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Save Note',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
