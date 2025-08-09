import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'
import { MobileFooter } from './mobile-footer'
import { allModes } from '.storybook/modes'

const meta = {
  title: 'MobileFooter',
  component: MobileFooter,
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
} satisfies Meta<typeof MobileFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
