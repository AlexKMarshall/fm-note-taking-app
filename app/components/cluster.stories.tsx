import type { Meta, StoryObj } from '@storybook/react-vite'

import { withRouter } from 'storybook-addon-remix-react-router'
import { allModes } from '../../.storybook/modes'
import { Cluster } from './cluster'
import { Button } from './button'

const meta = {
  title: 'Cluster',
  component: Cluster,
  decorators: [withRouter],
  args: {
    children: (
      <>
        <Button variant="primary">One</Button>
        <Button variant="secondary">Two</Button>
        <Button variant="secondary">Three</Button>
        <Button variant="secondary">Four</Button>
        <Button variant="secondary">Five</Button>
      </>
    ),
    gap: 'gap-4',
    align: 'items-center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Cluster>

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
export const DifferentVerticalAndHorizontalGaps: Story = {
  parameters: {
    chromatic: {
      modes: allModes,
    },
  },
  args: {
    gap: 'gap-6 gap-x-4 gap-y-2',
  },
}
