import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router'
import { NoteLinks } from './note-links'

const meta = {
  title: 'Features/Note/NoteLinks',
  component: NoteLinks,
  decorators: [withRouter],
  args: {
    notes: [
      {
        id: 1,
        title: 'React Performance Optimization',
        tags: ['Dev', 'React'],
        lastEdited: '29 Oct 2024',
      },
      {
        id: 2,
        title: 'Japan Travel Planning',
        tags: ['Travel', 'Personal'],
        lastEdited: '28 Oct 2024',
      },
    ],
  },
  parameters: {
    layout: 'padded',
    reactRouter: reactRouterParameters({
      location: { path: '/notes/1' },
      routing: { path: '/notes/1' },
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoteLinks>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
