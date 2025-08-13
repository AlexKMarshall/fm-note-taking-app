import { FooterLink } from './footer-link'
import { Separator } from './separator'

export function MobileFooter() {
  return (
    <footer
      // Uses a custom shadow because the shadow appears _above_ the footer, this is a bespoke one-off
      className="flex justify-between overflow-x-auto border-t border-gray-200 bg-white px-4 py-3 shadow-[0_-4px_6px_hsl(0deg_0%_94%_/_0.6)] md:px-8 lg:hidden"
    >
      <FooterLink to="/notes" label="Home" icon="icon-home" />
      <Separator orientation="vertical" className="max-sm:hidden" />
      <FooterLink to="/search" label="Search" icon="icon-search" />
      <Separator orientation="vertical" className="max-sm:hidden" />
      <FooterLink to="/archived" label="Archived" icon="icon-archive" />
      <Separator orientation="vertical" className="max-sm:hidden" />
      <FooterLink to="/tags" label="Tags" icon="icon-tag" />
      <Separator orientation="vertical" className="max-sm:hidden" />
      <FooterLink to="/settings" label="Settings" icon="icon-settings" />
    </footer>
  )
}
