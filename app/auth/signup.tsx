import { Form, Link, useActionData } from 'react-router'
import * as v from 'valibot'
import type { Route } from './+types/signup'
import { Input } from '~/components/input'
import { Label } from '~/components/label'

const SignupSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
})

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const payload = Object.fromEntries(formData)

  const result = v.safeParse(SignupSchema, payload)

  if (!result.success) {
    return {
      result: 'error',
      payload,
      issues: v.flatten<typeof SignupSchema>(result.issues),
    } as const
  }

  // TODO: Implement signup logic and redirect to home page
  return {
    result: 'success',
    payload: result.output,
    issues: null,
  } as const
}

export default function Signup() {
  const actionData = useActionData<typeof action>()
  const emailError = actionData?.issues?.nested?.email
  const passwordError = actionData?.issues?.nested?.password

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
      <Form method="post" className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            autoComplete="email"
            aria-invalid={Boolean(emailError) || undefined}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          <p
            id="email-error"
            className="flex flex-col text-xs text-red-500 empty:sr-only"
          >
            {emailError?.map((error) => (
              <span key={error}>{error}</span>
            ))}
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            aria-invalid={Boolean(passwordError) || undefined}
            aria-describedby={
              passwordError ? 'password-error' : 'password-description'
            }
            autoComplete="new-password"
          />
          <p id="password-description" className="text-xs text-gray-600">
            At least 8 characters
          </p>
          <p
            id="password-error"
            className="flex flex-col text-xs text-red-500 empty:sr-only"
          >
            {passwordError?.map((error) => (
              <span key={error}>{error}</span>
            ))}
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
