import { Outlet } from 'react-router'
import logo from '~/assets/images/logo.svg'
import { MobileFooter } from '~/components/mobile-footer'

export default function NotesLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 lg:bg-white">
      <MobileHeader />
      <main className="flex flex-1 flex-col rounded-t-xl bg-white lg:rounded-none">
        <div className="border-b border-b-gray-200 p-8 max-lg:hidden">
          <h1 className="text-2xl font-bold text-gray-950">All Notes</h1>
        </div>
        <div className="grid flex-1 lg:grid-cols-[auto_1fr]">
          <div className="border-r border-gray-200 py-5 pr-4 pl-8 max-lg:hidden">
            Desktop sidebar
          </div>
          <Outlet />
        </div>
      </main>
      <MobileFooter />
    </div>
  )
}

function MobileHeader() {
  return (
    <header className="bg-gray-100 px-4 py-3 md:px-8 md:py-4 lg:hidden">
      <img src={logo} alt="Notes" />
    </header>
  )
}
