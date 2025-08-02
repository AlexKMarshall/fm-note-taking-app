import { type ComponentProps, type ReactNode } from 'react'
import { tv } from 'tailwind-variants'
import { Icon } from './icon'

const inputStyles = tv({
  slots: {
    root: 'grid grid-cols-[auto_1fr_auto]',
    input:
      'col-span-full row-start-1 rounded-lg border border-gray-300 px-4 py-3 invalid:border-red-500 hover:bg-gray-50 focus-visible:border-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 aria-invalid:border-red-500',
    adornmentIcon: 'size-5 text-gray-500',
    startAdornment: 'col-start-1 row-start-1 self-center pl-4',
    endAdornment: 'col-start-3 row-start-1 self-center pr-4',
  },
  variants: {
    hasStartAdornment: {
      true: {
        input: 'pl-11', // 16px left padding + 20px icon size + 8px space
      },
    },
    hasEndAdornment: {
      true: {
        input: 'pr-11', // 16px right padding + 20px icon size + 8px space
      },
    },
  },
})

export function Input({
  startAdornment,
  endAdornment,
  ...props
}: Omit<ComponentProps<'input'>, 'className'> & {
  /** A slot to put a 20x20px icon or icon button */
  startAdornment?: ReactNode
  /** A slot to put a 20x20px icon or icon button */
  endAdornment?: ReactNode
}) {
  const hasStartAdornment = !!startAdornment
  const hasEndAdornment = !!endAdornment
  const {
    root,
    input,
    startAdornment: startAdornmentStyles,
    endAdornment: endAdornmentStyles,
  } = inputStyles({
    hasStartAdornment,
    hasEndAdornment,
  })
  return (
    <div className={root()}>
      <input {...props} className={input()} />
      {startAdornment ? (
        <div className={startAdornmentStyles()}>{startAdornment}</div>
      ) : null}
      {endAdornment ? (
        <div className={endAdornmentStyles()}>{endAdornment}</div>
      ) : null}
    </div>
  )
}

export function InputAdornmentIcon(props: ComponentProps<typeof Icon>) {
  const { adornmentIcon } = inputStyles()
  return <Icon {...props} className={adornmentIcon()} />
}
