import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  reactRouterOutlet,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router'
import type { ComponentProps } from 'react'
import NotesLayout from './layout'
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
  title: 'Routes/NotesLayout',
  component: NotesLayout,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(<Note {...noteArgs} />),
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
