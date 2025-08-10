import type { ComponentProps } from 'react'
import { Button } from '~/components/button'
import { Modal } from '~/components/modal'

export function DeleteNoteModal({
  trigger,
}: Pick<ComponentProps<typeof Modal>, 'trigger'>) {
  return (
    <Modal
      trigger={trigger}
      icon="icon-delete"
      title="Delete Note"
      description="Are you sure you want to permanently delete this note? This action cannot be undone."
      action={<Button variant="destructive">Delete Note</Button>}
    />
  )
}
