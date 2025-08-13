import { NavLink, Outlet } from 'react-router'
import type { ComponentProps } from 'react'
import { Stack } from '~/components/stack'
import logo from '~/assets/images/logo.svg'
import type { IconName } from '~/components/icon/names'
import { Icon } from '~/components/icon'
import { Separator } from '~/components/separator'
import { MobileHeader } from '~/components/mobile-header'
import { MobileFooter } from '~/components/mobile-footer'

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 lg:bg-white">
      <MobileHeader />
      <div className="grid grow lg:grid-cols-[minmax(auto,17rem)_1fr]">
        <Stack
          gap="gap-4"
          className="border-r border-gray-200 px-4 py-3 max-lg:hidden"
        >
          <div className="py-3">
            <img src={logo} alt="Notes" className="h-7" />
          </div>
          <Stack gap="gap-2">
            <Stack gap="gap-1">
              <SidebarLink to="/notes" icon="icon-home" label="All Notes" />
              <SidebarLink
                to="/archived"
                icon="icon-archive"
                label="Archived Notes"
              />
            </Stack>
            <Separator orientation="horizontal" />
            <h2 className="px-2 text-sm font-medium text-gray-500">Tags</h2>
            <Stack gap="gap-1">
              <SidebarLink to="/tags/1" icon="icon-tag" label="Tag 1" />
              <SidebarLink to="/tags/2" icon="icon-tag" label="Tag 2" />
              <SidebarLink to="/tags/3" icon="icon-tag" label="Tag 3" />
            </Stack>
          </Stack>
        </Stack>
        <Outlet />
      </div>
      <MobileFooter />
    </div>
  )
}

function SidebarLink({
  to,
  icon,
  label,
}: Pick<ComponentProps<typeof NavLink>, 'to'> & {
  icon: IconName
  label: string
}) {
  return (
    <NavLink
      to={to}
      className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-950 aria-[current]:bg-gray-100"
    >
      <Icon name={icon} className="size-5 group-aria-[current]:text-blue-500" />
      <span className="grow">{label}</span>
      <Icon
        name="icon-chevron-right"
        className="invisible size-5 group-aria-[current]:visible"
      />
    </NavLink>
  )
}
