import { tv } from 'tailwind-variants'
import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import type { IconName } from './icon/names'
import { Icon } from './icon'

const buttonStyles = tv({
  base: 'grid aspect-square size-12 cursor-pointer place-items-center rounded-full shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:bg-gray-100 disabled:text-gray-300 md:size-16',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-800',
    },
  },
})

export function FloatingIconButton({
  className,
  icon,
  variant,
  label,
  onClick,
}: {
  className?: string
  label: string
  icon: IconName
  variant: 'primary'
} & Pick<ComponentProps<'button'>, 'onClick'>) {
  return (
    <button
      aria-label={label}
      className={buttonStyles({ variant, className })}
      onClick={onClick}
    >
      <Icon name={icon} className="size-8" />
    </button>
  )
}

export function FloatingIconButtonLink({
  className,
  icon,
  variant,
  label,
  to,
}: {
  className?: string
  label: string
  icon: IconName
  variant: 'primary'
} & Pick<ComponentProps<typeof Link>, 'to'>) {
  return (
    <Link
      aria-label={label}
      to={to}
      className={buttonStyles({ variant, className })}
    >
      <Icon name={icon} className="size-8" />
    </Link>
  )
}
