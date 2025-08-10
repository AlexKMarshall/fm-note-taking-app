import { type ComponentProps } from 'react'
import { Link } from 'react-router'
import { tv } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-300',
  variants: {
    variant: {
      primary:
        'border-blue-500 bg-blue-500 text-white hover:border-blue-700 hover:bg-blue-700 active:border-blue-800 active:bg-blue-800',
      secondary:
        'border-gray-100 bg-gray-100 text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-950 hover:shadow-xs focus-visible:border-gray-300 focus-visible:bg-white focus-visible:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500',
    },
  },
})

export function Button({
  children,
  className,
  variant,
  ...props
}: ComponentProps<'button'> & { variant: 'primary' | 'secondary' }) {
  return (
    <button
      type="button"
      {...props}
      className={buttonStyles({ variant, className })}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  children,
  className,
  variant,
  ...props
}: ComponentProps<typeof Link> & { variant: 'primary' | 'secondary' }) {
  return (
    <Link {...props} className={buttonStyles({ variant, className })}>
      {children}
    </Link>
  )
}
