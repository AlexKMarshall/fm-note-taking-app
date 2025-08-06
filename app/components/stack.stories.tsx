import type { Meta, StoryObj } from '@storybook/react-vite'

import { allModes } from '../../.storybook/modes'
import { Stack } from './stack'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stack',
  component: Stack,
  args: {
    children: (
      <>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </>
    ),
    gap: 'gap-4',
    align: 'items-stretch',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ResponsiveGaps: Story = {
  parameters: {
    chromatic: {
      modes: allModes,
    },
  },
  args: {
    gap: 'gap-2 md:gap-4 lg:gap-12',
  },
}
