import { redirect } from 'react-router'

import { type SubmissionResult } from '@conform-to/react'
import { parseWithValibot } from '@conform-to/valibot'
import { LoginSchema } from '../_lib/login-schema'

export async function loginAction(
  formData: FormData,
): Promise<SubmissionResult | Response> {
  const submission = parseWithValibot(formData, { schema: LoginSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  // const { email, password } = submission.value
  // TODO: validate the user and password
  // Get the user and password hash from the database
  // If no user, return generic credentials error
  // Validate the password hash
  // If password is invalid, return generic credentials error
  // If password is valid, create a session for the user
  // Redirect to the home page

  return redirect('/')
}
