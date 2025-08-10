import type { Meta, StoryObj } from '@storybook/react-vite'

import { IconButton } from './icon-button'
import { iconNames } from './icon/names'

const meta = {
  title: 'IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: 'icon-delete',
    label: 'Delete',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
