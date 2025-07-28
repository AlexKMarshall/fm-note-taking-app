import type { Meta, StoryObj } from '@storybook/react-vite'

import { FieldDescription as FieldDescriptionComponent } from './field-description'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'FieldDescription',
  component: FieldDescriptionComponent,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'At least 8 characters',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FieldDescriptionComponent>

export default meta
type Story = StoryObj<typeof meta>

export const FieldDescription: Story = {}
