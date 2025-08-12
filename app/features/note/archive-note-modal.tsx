import { type ComponentProps } from 'react'
import { Form } from 'react-router'
import { Button } from '~/components/button'
import { Modal } from '~/components/modal'

export function ArchiveNoteModal({
  trigger,
}: Pick<ComponentProps<typeof Modal>, 'trigger'>) {
  return (
    <Modal
      trigger={trigger}
      icon="icon-archive"
      title="Archive Note"
      description="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
      action={
        <Form method="post">
          <Button variant="primary" name="intent" value="archive" type="submit">
            Archive Note
          </Button>
        </Form>
      }
    />
  )
}
