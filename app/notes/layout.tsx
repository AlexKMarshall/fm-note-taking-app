import type { ComponentProps } from 'react'
import { Link, Outlet } from 'react-router'
import logo from '~/assets/images/logo.svg'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/names'
import { Separator } from '~/components/separator'

export default function NotesLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 lg:bg-white">
      <header className="bg-gray-100 px-4 py-3 md:px-8 md:py-4 lg:hidden">
        <img src={logo} alt="Notes" />
      </header>
      <main className="flex-1 rounded-t-xl bg-white">
        <Outlet />
      </main>
      <footer className="flex justify-between border-t border-gray-200 bg-white px-4 py-3 shadow-[0_-4px_6px_hsl(0deg_0%_94%_/_0.6)] md:px-8 lg:hidden">
        <FooterLink to="/notes" label="Home" icon="icon-home" />
        <Separator orientation="vertical" className="max-sm:hidden" />
        <FooterLink to="/notes/search" label="Search" icon="icon-search" />
        <Separator orientation="vertical" className="max-sm:hidden" />
        <FooterLink to="/notes/archived" label="Archived" icon="icon-archive" />
        <Separator orientation="vertical" className="max-sm:hidden" />
        <FooterLink to="/notes/tags" label="Tags" icon="icon-tag" />
        <Separator orientation="vertical" className="max-sm:hidden" />
        <FooterLink to="/settings" label="Settings" icon="icon-settings" />
      </footer>
    </div>
  )
}

function FooterLink({
  to,
  label,
  icon,
}: Pick<ComponentProps<typeof Link>, 'to'> & {
  label: string
  icon: IconName
}) {
  return (
    <Link
      to={to}
      className="flex basis-20 flex-col items-center gap-1 rounded-sm py-4 text-gray-600 hover:bg-blue-50 hover:text-blue-500 focus-visible:bg-blue-50 focus-visible:text-blue-500 focus-visible:outline-2 focus-visible:outline-blue-500"
    >
      <Icon name={icon} className="size-4 sm:size-6" />
      <span className="text-xs max-sm:sr-only">{label}</span>
    </Link>
  )
}
