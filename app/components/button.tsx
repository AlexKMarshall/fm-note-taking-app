import { type ComponentProps } from 'react'
import { Link } from 'react-router'
import { tv } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:bg-gray-100 disabled:text-gray-300',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-800',
    },
  },
})

export function Button({
  children,
  className,
  variant,
  ...props
}: ComponentProps<'button'> & { variant: 'primary' }) {
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
}: ComponentProps<typeof Link> & { variant: 'primary' }) {
  return (
    <Link {...props} className={buttonStyles({ variant, className })}>
      {children}
    </Link>
  )
}
