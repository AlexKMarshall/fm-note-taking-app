import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge as BadgeComponent } from './badge'

const meta = {
  title: 'Badge',
  component: BadgeComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'React',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BadgeComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Badge: Story = {}
