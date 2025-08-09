import type { Meta, StoryObj } from '@storybook/react-vite'

import type { ComponentProps } from 'react'
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router'
import { NotesLayout } from './notes-layout'
import { allModes } from '.storybook/modes'

import { Note } from '~/features/note/note'

const noteArgs: ComponentProps<typeof Note> = {
  title: 'React Performance Optimization',
  tags: ['Dev', 'React'],
  lastEdited: '29 Oct 2024',
  content: `Key performance optimization techniques:

1. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports for heavy components

2. Memoization
- useMemo for expensive calculations
- useCallback for function props
- React.memo for component optimization

3. Virtual List Implementation
- Use react-window for long lists
- Implement infinite scrolling

TODO: Benchmark current application and identify bottlenecks`,
}

const meta = {
  title: 'Features/Note/NotesLayout',
  component: NotesLayout,
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
    children: <Note {...noteArgs} />,
  },
  parameters: {
    layout: 'fullscreen',
    reactRouter: reactRouterParameters({
      location: { path: '/notes/1' },
      routing: { path: '/notes/1' },
    }),
    chromatic: {
      modes: allModes,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotesLayout>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
