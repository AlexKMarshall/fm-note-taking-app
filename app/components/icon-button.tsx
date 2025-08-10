import clsx from 'clsx'
import { type ComponentProps } from 'react'
import { Icon } from './icon'
import type { IconName } from './icon/names'

export function IconButton({
  className,
  icon,
  label,
  ...props
}: Omit<ComponentProps<'button'>, 'children' | 'aria-label'> & {
  icon: IconName
  label: string
}) {
  return (
    <button
      type="button"
      {...props}
      aria-label={label}
      className={clsx(
        'inline-flex cursor-pointer items-center rounded-sm text-sm text-gray-600 transition-colors hover:text-gray-800 focus-visible:text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 active:text-gray-950',
        // Add a 48px tap target pseudo-element for coarse pointer users
        'relative not-pointer-fine:after:absolute not-pointer-fine:after:top-1/2 not-pointer-fine:after:left-1/2 not-pointer-fine:after:size-12 not-pointer-fine:after:-translate-x-1/2 not-pointer-fine:after:-translate-y-1/2',
        className,
      )}
    >
      <Icon name={icon} className="size-4.5" />
    </button>
  )
}
