import { type ComponentProps } from 'react'
import { Link } from 'react-router'
import { tv } from 'tailwind-variants'

const textButtonStyles = tv({
  base: 'inline-flex cursor-pointer items-center gap-1 rounded-sm text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:text-gray-300',
  variants: {
    variant: {
      primary:
        'text-blue-500 hover:text-blue-700 focus-visible:text-blue-700 active:text-blue-800',
      secondary:
        'text-gray-600 hover:text-gray-800 focus-visible:text-gray-800 active:text-gray-950',
    },
  },
})

export function TextButton({
  children,
  className,
  variant,
  ...props
}: ComponentProps<'button'> & { variant: 'primary' | 'secondary' }) {
  return (
    <button
      type="button"
      {...props}
      className={textButtonStyles({ variant, className })}
    >
      {children}
    </button>
  )
}

export function TextButtonLink({
  children,
  className,
  variant,
  ...props
}: ComponentProps<typeof Link> & { variant: 'primary' | 'secondary' }) {
  return (
    <Link {...props} className={textButtonStyles({ variant, className })}>
      {children}
    </Link>
  )
}
