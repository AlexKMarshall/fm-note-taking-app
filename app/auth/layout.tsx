import { Outlet } from 'react-router'
import logo from '../assets/images/logo.svg'
import { Stack } from '~/components/stack'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <main className="max-w-130 basis-full rounded-xl bg-white px-4 py-12 shadow-lg md:px-8 lg:max-w-135 lg:px-12">
        <Stack gap="4">
          <div className="flex justify-center pb-2">
            <img src={logo} alt="Notes" />
          </div>
          <Outlet />
        </Stack>
      </main>
    </div>
  )
}
