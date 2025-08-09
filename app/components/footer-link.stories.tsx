import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'
import { FooterLink } from './footer-link'
import { iconNames } from './icon/names'
import { allModes } from '.storybook/modes'

const meta = {
  title: 'FooterLink',
  component: FooterLink,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    chromatic: {
      modes: {
        small: allModes.small,
        medium: allModes.medium,
      },
    },
  },
  args: {
    to: '/',
    label: 'Home',
    icon: 'icon-home',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FooterLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
