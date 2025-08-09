import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'
import { MobileHeader } from './mobile-header'
import { allModes } from '.storybook/modes'

const meta = {
  title: 'MobileHeader',
  component: MobileHeader,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      modes: {
        small: allModes.small,
        medium: allModes.medium,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MobileHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
