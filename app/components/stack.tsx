import type { ComponentProps } from 'react'
import { mergeTailwindClasses } from '~/lib/merge-tailwind-classes'

export function Stack({
  gap,
  align,
  className,
  ...props
}: ComponentProps<'div'> & {
  /**
   * The gap between items in the stack. Accepts a tailwind gap value string
   *
   * We cannot type-check the gap value as tailwind doesn't accept dynamic strings
   * So it's up to you to make sure the gap value is valid.
   * @example <Stack gap="gap-2"/>
   * @example <Stack gap="gap-2 md:gap-4"/>
   */
  gap: string
  /**
   * The alignment of the items in the stack. Accepts a tailwind alignment value string
   *
   * We cannot type-check the alignment value as tailwind doesn't accept dynamic strings
   * So it's up to you to make sure the alignment value is valid.
   
  *  @example <Stack align="items-start"/>
   * @example <Stack align="items-stretch md:items-center"/>
   */
  align?: string
}) {
  return (
    <div
      {...props}
      className={mergeTailwindClasses('flex flex-col', gap, align, className)}
    />
  )
}
