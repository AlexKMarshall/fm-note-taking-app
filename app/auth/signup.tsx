import { Form, Link, useActionData } from 'react-router'
import * as v from 'valibot'

import type { Route } from './+types/signup'
import { Input } from '~/components/input'
import { Label } from '~/components/label'
import { FieldDescription } from '~/components/field-description'
import { FieldError } from '~/components/field-error'
import { Field } from '~/components/field'

/**
 * Transforms an empty string to undefined.
 * This can be used to show different error messages for empty form fields compared with non-empty invalid fields
 */
const transformEmptyStringToUndefined = v.transform((value) => {
  if (typeof value !== 'string') {
    return value
  }

  if (value.trim() === '') {
    return undefined
  }

  return value
})

const SignupSchema = v.object({
  email: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.string('Please enter a valid email address'),
    v.email('Please enter a valid email address'),
  ),
  password: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.string('Please enter a password'),
    v.minLength(8, 'Password must be at least 8 characters long'),
  ),
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
        <Field>
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
          <FieldError errors={emailError} id="email-error" />
        </Field>
        <Field>
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
          <FieldDescription id="password-description">
            At least 8 characters
          </FieldDescription>
          <FieldError errors={passwordError} id="password-error" />
        </Field>
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
