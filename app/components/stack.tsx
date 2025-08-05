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

type Gap = `gap-${number}`
type ModifiedGap = `${string}:${Gap}`
type ModifiedGaps = Array<ModifiedGap>

export function Stack({
  gap,
  align,
  className,
  modifiedGaps,
  ...props
}: ComponentProps<'div'> &
  StackVariants & {
    /**
     * Use this to modify the gap under certain conditions. E.g. to increase the gap size on larger screens.
     *
     * @example <Flex gap="gap-3" modifiedGaps={['md:gap-4', 'lg:gap-5']} />
     */
    modifiedGaps?: ModifiedGaps
  }) {
  return (
    <div
      {...props}
      className={stackStyles({
        gap,
        align,
        className: [modifiedGaps, className],
      })}
    />
  )
}
