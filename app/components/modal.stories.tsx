import type { Meta, StoryObj } from '@storybook/react-vite'

import { Modal } from './modal'
import { Button } from './button'

const meta = {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: 'icon-delete',
    title: 'Delete Note',
    description:
      'Are you sure you want to permanently delete this note? This action cannot be undone.',
    action: <Button variant="destructive">Delete Note</Button>,
    trigger: ({ show }) => (
      <Button onClick={show} variant="primary">
        Open
      </Button>
    ),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
