import { type SVGProps } from 'react'
import { type IconName } from './names'
import spriteHref from './sprite.svg'
import { mergeTailwindClasses } from '~/lib/merge-tailwind-classes'

/**
 * Visual icon component. This is purely decorative, do not use to convey important meaning, always add additional text
 * where the icon has some meaning.
 */
export function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
}) {
  return (
    <svg
      aria-hidden="true"
      role="img"
      // we never want to squish an icon if it's inside a flex  container
      className={mergeTailwindClasses('shrink-0', className)}
      {...props}
    >
      <use href={`${spriteHref}#${name}`} />
    </svg>
  )
}
