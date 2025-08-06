import type { Meta, StoryObj } from '@storybook/react-vite'

import { allModes } from '../../../.storybook/modes'
import { Note } from './note'

const meta = {
  title: 'Note',
  component: Note,
  parameters: {
    chromatic: {
      modes: allModes,
    },
  },
  tags: ['autodocs'],
  args: {
    title: 'React Performance Optimization',
    tags: ['Dev', 'React'],
    lastEdited: '29 Oct 2024',
    content: `Key performance optimization techniques:

1. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports for heavy components

2.	Memoization
- useMemo for expensive calculations
- useCallback for function props
- React.memo for component optimization

3. Virtual List Implementation
- Use react-window for long lists
- Implement infinite scrolling

TODO: Benchmark current application and identify bottlenecks`,
  },
} satisfies Meta<typeof Note>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
