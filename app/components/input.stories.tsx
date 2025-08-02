import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Input, InputAdornmentButton, InputAdornmentIcon } from './input'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Enter your email',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}

export const WithContent: Story = {
  args: {
    defaultValue: 'test@example.com',
  },
}

export const Focused: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole('textbox'), 'test@example.com')
  },
}

export const Invalid: Story = {
  args: {
    defaultValue: 'invalid-email',
    'aria-invalid': true,
  },
}

export const WithStartAdornment: Story = {
  args: {
    startAdornment: <InputAdornmentIcon name="icon-search" />,
  },
}

export const WithEndAdornment: Story = {
  args: {
    endAdornment: <InputAdornmentIcon name="icon-search" />,
  },
}

const mockClickHandler = fn()
mockClickHandler.mockName('mockClickHandler')

export const WithEndAdornmentButton: Story = {
  args: {
    endAdornment: (
      <InputAdornmentButton
        iconName="icon-search"
        aria-label="Search"
        onClick={mockClickHandler}
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Search' }))
    await expect(mockClickHandler).toHaveBeenCalledOnce()
  },
}
