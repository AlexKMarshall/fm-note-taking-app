import { Form, Link, redirect, useActionData } from 'react-router'

import { parseWithValibot } from '@conform-to/valibot'
import { useForm, type SubmissionResult } from '@conform-to/react'
import type { Route } from './+types/signup'
import { SignupSchema } from './_lib/signup-schema'
import { Input } from '~/components/input'
import { Label } from '~/components/label'
import { FieldDescription } from '~/components/field-description'
import { FieldError } from '~/components/field-error'
import { Field } from '~/components/field'

export async function action({
  request,
}: Route.ActionArgs): Promise<SubmissionResult | Response> {
  const formData = await request.formData()
  const submission = parseWithValibot(formData, { schema: SignupSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  return redirect('/')
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
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-gray-950">
          Create Your Account
        </h1>
        <p className="text-sm text-gray-600">
          Sign up to start organizing your notes and boost your productivity.
        </p>
      </div>
      <Form
        id={form.id}
        method="post"
        onSubmit={form.onSubmit}
        className="flex flex-col gap-4"
        noValidate
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
