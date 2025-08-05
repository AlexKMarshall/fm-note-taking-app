import { Form, Link, useActionData } from 'react-router'

import {
  getFormProps,
  getInputProps,
  useForm,
  type SubmissionResult,
} from '@conform-to/react'
import { parseWithValibot } from '@conform-to/valibot'
import type { Route } from './+types/signup'
import { makeSignupAction } from './_actions/signup-action'
import { SignupSchema } from './_lib/signup-schema'
import { Field } from '~/components/field'
import { FieldDescription } from '~/components/field-description'
import { FieldError } from '~/components/field-error'
import { Input } from '~/components/input'
import { Label } from '~/components/label'
import { Stack } from '~/components/stack'
import { UserRepository, UserService } from '~/features/user/user-service'
import {
  PasswordInput,
  getPasswordInputProps,
} from '~/components/password-input'

export async function action({
  request,
  context,
}: Route.ActionArgs): Promise<SubmissionResult | Response> {
  const formData = await request.formData()

  const signupAction = makeSignupAction({
    userService: new UserService(new UserRepository(context.db)),
  })

  return signupAction({
    formData,
    sessionStorage: context.sessionStorage,
  })
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
        method="post"
        {...getFormProps(form)}
        className="flex flex-col gap-4 pt-6"
      >
        <Field>
          <Label htmlFor={fields.email.id}>Email Address</Label>
          <Input
            {...getInputProps(fields.email, { type: 'email' })}
            placeholder="email@example.com"
            autoComplete="email"
          />
          <FieldError errors={fields.email.errors} id={fields.email.errorId} />
        </Field>
        <Field>
          <Label htmlFor={fields.password.id}>Password</Label>
          <PasswordInput
            {...getPasswordInputProps(fields.password, {
              // We only want to pass an additional description if the field doesn't have an error
              ariaDescribedBy: fields.password.errors
                ? undefined
                : 'password-description',
            })}
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
