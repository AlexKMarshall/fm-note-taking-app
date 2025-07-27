import { Form, Link } from 'react-router'
import type { Route } from './+types/signup'
import { Input } from '~/components/input'
import { Label } from '~/components/label'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  console.log({ email, password })
}

export default function Signup() {
  return (
    <>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-gray-950">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-600">
          Sign up to start organizing your notes and boost your productivity.
        </p>
      </div>
      <Form method="post" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            aria-describedby="password-description"
            autoComplete="new-password"
          />
          <p id="password-description" className="text-xs text-gray-600">
            At least 8 characters
          </p>
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gray-400"
        >
          Sign Up
        </button>
      </Form>
      <div className="h-px w-full bg-gray-200" />
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-gray-950">
          Login
        </Link>
      </p>
    </>
  )
}
