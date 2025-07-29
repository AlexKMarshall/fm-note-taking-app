import { Form, Link, useActionData } from 'react-router'

import { useForm, type SubmissionResult } from '@conform-to/react'
import { parseWithValibot } from '@conform-to/valibot'
import type { Route } from './+types/signup'
import { makeSignupAction } from './_actions/signup-action'
import { SignupSchema } from './_lib/signup-schema'
import { Field } from '~/components/field'
import { FieldDescription } from '~/components/field-description'
import { FieldError } from '~/components/field-error'
import { Input } from '~/components/input'
import { Label } from '~/components/label'
import { createUser } from '~/data-layer/user'
import { Stack } from '~/components/stack'

export async function action({
  request,
  context,
}: Route.ActionArgs): Promise<SubmissionResult | Response> {
  const formData = await request.formData()

  const signupAction = makeSignupAction({
    saveUser: async (userDto) => {
      return createUser(context.db, userDto)
    },
  })

  return signupAction(formData)
}

export default function Signup() {
  const lastResult = useActionData<typeof action>()

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithValibot(formData, { schema: SignupSchema }),
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  return (
    <>
      <Stack align="center" gap="2" className="text-center">
        <h1 className="text-2xl font-bold text-gray-950">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-600">
          Sign up to start organizing your notes and boost your productivity.
        </p>
      </Stack>
      <Form
        id={form.id}
        method="post"
        onSubmit={form.onSubmit}
        className="flex flex-col gap-4"
        noValidate
        aria-describedby={form.errors ? form.errorId : undefined}
      >
        <Field>
          <Label htmlFor={fields.email.id}>Email Address</Label>
          <Input
            id={fields.email.id}
            name={fields.email.name}
            defaultValue={fields.email.initialValue}
            type="email"
            placeholder="email@example.com"
            autoComplete="email"
            aria-invalid={fields.email.errors ? true : undefined}
            aria-describedby={
              fields.email.errors ? fields.email.errorId : undefined
            }
          />
          <FieldError errors={fields.email.errors} id={fields.email.errorId} />
        </Field>
        <Field>
          <Label htmlFor={fields.password.id}>Password</Label>
          <Input
            id={fields.password.id}
            name={fields.password.name}
            type="password"
            aria-invalid={fields.password.errors ? true : undefined}
            aria-describedby={
              fields.password.errors
                ? fields.password.errorId
                : 'password-description'
            }
            autoComplete="new-password"
          />
          <FieldDescription id="password-description">
            At least 8 characters
          </FieldDescription>
          <FieldError
            errors={fields.password.errors}
            id={fields.password.errorId}
          />
        </Field>
        <Stack gap="2">
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-500 px-4 py-3 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gray-400"
          >
            Sign Up
          </button>
          <FieldError errors={form.errors} id={form.errorId} />
        </Stack>
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
