import {
  createContext,
  use,
  useId,
  useRef,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from 'react'
import { Cluster } from './cluster'
import type { IconName } from './icon/names'
import { Icon } from './icon'
import { Stack } from './stack'
import { Separator } from './separator'
import { Button } from './button'

type ModalContext = {
  dialogRef: RefObject<HTMLDialogElement | null>
  show: () => void
  close: () => void
}

const ModalContext = createContext<ModalContext | null>(null)

export function useModal() {
  const context = use(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalRoot')
  }
  return context
}

export function Root({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  function show() {
    dialogRef.current?.showModal()
  }

  function close() {
    dialogRef.current?.close()
  }

  return (
    <ModalContext value={{ dialogRef, show, close }}>{children}</ModalContext>
  )
}

export function Trigger({
  children,
}: {
  children: ({ show }: Pick<ModalContext, 'show'>) => ReactNode
}) {
  const { show } = useModal()
  return children({ show })
}

export function CancelButton() {
  const { close } = useModal()
  return (
    <Button variant="secondary" onClick={close}>
      Cancel
    </Button>
  )
}

export function Content({
  icon,
  title,
  description,
  action,
}: {
  icon?: IconName
  title: string
  description?: string
  action: ReactNode
}) {
  const { dialogRef } = useModal()
  const titleId = useId()
  const descriptionId = useId()
  return (
    <dialog
      ref={dialogRef}
      // We can't set padding on the body so we need a combination of a vw and min() to make it responsive and not hit the sides of small screens
      className="m-auto w-[min(28rem,90vw)] rounded-xl bg-white backdrop:bg-gray-950/50"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      // Even though this isn't supported in safari yet, it's a progressive enhancement, safari users can use the close button
      // @ts-expect-error - closedby is a valid attribute for dialogs, even though not in the types, it has support everywhere except safari
      // eslint-disable-next-line react/no-unknown-property
      closedby="any"
    >
      <div className="@container flex items-start gap-4 p-5">
        {icon ? (
          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-950 @max-2xs:hidden">
            <Icon name={icon} className="size-6" />
          </div>
        ) : null}
        <Stack gap="gap-1.5" className="shrink">
          <h2 className="font-bold text-gray-950" id={titleId}>
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-pretty text-gray-700" id={descriptionId}>
              {description}
            </p>
          ) : null}
        </Stack>
      </div>
      <Separator orientation="horizontal" />
      <Cluster justify="justify-end" gap="gap-x-4 gap-y-2" className="p-5">
        <CancelButton />
        {action}
      </Cluster>
    </dialog>
  )
}

export function Modal({
  trigger,
  ...contentProps
}: ComponentProps<typeof Content> & {
  trigger: ComponentProps<typeof Trigger>['children']
}) {
  return (
    <Root>
      <Trigger>{trigger}</Trigger>
      <Content {...contentProps} />
    </Root>
  )
}
