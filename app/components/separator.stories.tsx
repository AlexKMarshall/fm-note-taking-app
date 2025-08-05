import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './separator'
import { mergeTailwindClasses } from '~/lib/merge-tailwind-classes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  tags: ['autodocs'],
  render: (args) => (
    <div
      className={mergeTailwindClasses(
        'flex gap-4',
        args.orientation === 'horizontal' ? 'flex-col' : 'flex-row',
      )}
    >
      <div>Item 1</div>
      <Separator {...args} />
      <div>Item 2</div>
    </div>
  ),
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
}
