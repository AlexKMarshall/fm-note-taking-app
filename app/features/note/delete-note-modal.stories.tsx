import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent } from 'storybook/test'
import { withRouter } from 'storybook-addon-remix-react-router'
import { DeleteNoteModal } from './delete-note-modal'
import { Button } from '~/components/button'

const meta = {
  title: 'Features/Note/DeleteNoteModal',
  component: DeleteNoteModal,
  decorators: [withRouter],
  args: {
    trigger: ({ show }) => (
      <Button onClick={show} variant="primary">
        Open
      </Button>
    ),
  },
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof DeleteNoteModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }))
  },
}
