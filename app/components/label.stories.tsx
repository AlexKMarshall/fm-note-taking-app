import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from './label'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Email Address',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}
