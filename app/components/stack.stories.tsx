import type { Meta, StoryObj } from '@storybook/react-vite'

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
    gap: '4',
    align: 'stretch',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['1.5', '2', '4'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
