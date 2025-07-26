import { Outlet } from 'react-router'
import logo from '../assets/images/logo.svg'
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <main className="flex max-w-130 basis-full flex-col gap-4 rounded-xl bg-white px-4 py-12 shadow-lg md:px-8 lg:max-w-135 lg:px-12">
        <div className="flex justify-center pb-2">
          <img src={logo} alt="Notes" />
        </div>
        <Outlet />
      </main>
    </div>
  )
}
