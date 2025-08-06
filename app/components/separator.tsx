import { mergeTailwindClasses } from '~/lib/merge-tailwind-classes'

/**
 * A separator between two items. No semantic meaning, just a visual divider
 */
export function Separator({
  orientation,
}: {
  orientation: 'horizontal' | 'vertical'
}) {
  return (
    <span
      className={mergeTailwindClasses(
        'block shrink-0 bg-gray-200',
        orientation === 'horizontal' ? 'h-px' : 'w-px',
      )}
    />
  )
}
