import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'
import { userEvent, within } from 'storybook/test'
import { FooterLink } from './footer-link'
import { iconNames } from './icon/names'

const meta = {
  title: 'FooterLink',
  component: FooterLink,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
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
export const Hovered: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.hover(canvas.getByRole('link', { name: 'Home' }))
  },
}
