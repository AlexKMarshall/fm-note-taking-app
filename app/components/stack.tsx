import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

type SetRequired<T, K extends keyof T> = T & Required<Pick<T, K>>

const stackStyles = tv({
  base: 'flex flex-col',
  variants: {
    gap: {
      '1.5': 'gap-1.5',
      '2': 'gap-2',
      '4': 'gap-4',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    align: 'stretch',
  },
})

type StackVariants = SetRequired<VariantProps<typeof stackStyles>, 'gap'>

export function Stack({
  gap,
  align,
  className,
  ...props
}: ComponentProps<'div'> & StackVariants) {
  return <div {...props} className={stackStyles({ gap, align, className })} />
}
