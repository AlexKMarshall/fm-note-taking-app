import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import type { IconName } from './icon/names'
import { Icon } from './icon'

export function FooterLink({
  to,
  label,
  icon,
}: Pick<ComponentProps<typeof Link>, 'to'> & {
  label: string
  icon: IconName
}) {
  return (
    <Link
      to={to}
      className="flex basis-20 flex-col items-center gap-1 rounded-sm p-4 text-gray-600 hover:bg-blue-50 hover:text-blue-500 focus-visible:bg-blue-50 focus-visible:text-blue-500 focus-visible:outline-2 focus-visible:outline-blue-500"
    >
      <Icon name={icon} className="size-4 sm:size-6" />
      <span className="text-xs max-sm:sr-only">{label}</span>
    </Link>
  )
}
