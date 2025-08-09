import clsx from 'clsx'

/**
 * A separator between two items. No semantic meaning, just a visual divider
 */
export function Separator({
  orientation,
  className,
}: {
  orientation: 'horizontal' | 'vertical'
  className?: string
}) {
  return (
    <span
      className={clsx(
        'block shrink-0 bg-gray-200',
        orientation === 'horizontal' ? 'h-px' : 'w-px',
        className,
      )}
    />
  )
}
