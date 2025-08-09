import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'
import { NoteLink } from './note-link'

const meta = {
  title: 'Features/Note/NoteLink',
  component: NoteLink,
  decorators: [withRouter],
  args: {
    to: '/notes/123',
    note: {
      title: 'React Performance Optimization',
      tags: ['Dev', 'React'],
      lastUpdated: '29 Oct 2024',
    },
  },
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof NoteLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
