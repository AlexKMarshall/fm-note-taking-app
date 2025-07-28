import { type SVGProps } from 'react'
import { type IconName } from './names'
import spriteHref from './sprite.svg'

/**
 * Visual icon component. This is purely decorative, do not use to convey important meaning, always add additional text
 * where the icon has some meaning.
 */
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
}) {
  return (
    <svg aria-hidden="true" role="img" {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  )
}
