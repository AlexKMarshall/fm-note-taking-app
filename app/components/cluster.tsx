import clsx from 'clsx'
import type { ComponentProps } from 'react'

export function Cluster({
  gap,
  align,
  className,
  ...props
}: ComponentProps<'div'> & {
  /**
   * The gap between items in the cluster. Accepts a tailwind gap value string
   *
   * We cannot type-check the gap value as tailwind doesn't accept dynamic strings
   * So it's up to you to make sure the gap value is valid.
   * @example <Cluster gap="gap-2"/>
   * @example <Cluster gap="gap-2 md:gap-4"/>
   */
  gap: string
  /**
   * The alignment of the items in the cluster. Accepts a tailwind alignment value string
   *
   * We cannot type-check the alignment value as tailwind doesn't accept dynamic strings
   * So it's up to you to make sure the alignment value is valid.
   
  *  @example <Cluster align="items-start"/>
   * @example <Cluster align="items-stretch md:items-center"/>
   */
  align?: string
}) {
  return (
    <div
      {...props}
      className={clsx('flex flex-row flex-wrap', gap, align, className)}
    />
  )
}
