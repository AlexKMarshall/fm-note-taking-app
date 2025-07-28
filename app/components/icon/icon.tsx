import { type SVGProps } from 'react'
import { type IconName } from './names'
import spriteHref from './sprite.svg'

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
}) {
  return (
    <svg {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  )
}
