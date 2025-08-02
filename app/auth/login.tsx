import { parseWithValibot } from '@conform-to/valibot'
import { getFormProps, useForm, getInputProps } from '@conform-to/react'
import { useActionData, Form, Link } from 'react-router'
import type { Route } from './+types/login'
import { LoginSchema } from './_lib/login-schema'
import { makeLoginAction } from './_actions/login-action'
import { Stack } from '~/components/stack'
import { Field } from '~/components/field'
import { FieldError } from '~/components/field-error'
import { Input } from '~/components/input'
import { Label } from '~/components/label'
import { UserRepository, UserService } from '~/features/user/user-service'
import { PasswordInput } from '~/components/password-input'

export async function action({ request, context }: Route.ActionArgs) {
  const loginAction = makeLoginAction({
    userService: new UserService(new UserRepository(context.db)),
  })
  const formData = await request.formData()
  return loginAction({ formData, sessionStorage: context.sessionStorage })
}

export default function Login() {
  const lastResult = useActionData<typeof action>()

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithValibot(formData, { schema: LoginSchema }),
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  return (
    <>
      <Stack align="center" gap="2" className="text-center">
        <h1 className="text-2xl font-bold text-gray-950">Welcome to Note</h1>
        <p className="text-sm text-gray-600">Please log in to continue</p>
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
            {...getInputProps(fields.password, {
              // We have to do this because **we** control the type of the input in the PasswordInput component
              // and we can't let Conform try to control it
              type: undefined as unknown as 'text',
            })}
            autoComplete="current-password"
          />
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
            Login
          </button>
          <FieldError errors={form.errors} id={form.errorId} />
        </Stack>
      </Form>
      <div className="h-px w-full bg-gray-200" />
      <p className="text-center text-sm text-gray-600">
        No account yet?{' '}
        <Link to="/signup" className="text-gray-950">
          Sign Up
        </Link>
      </p>
    </>
  )
}
