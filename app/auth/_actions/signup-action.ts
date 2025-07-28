import { redirect } from 'react-router'

import { type SubmissionResult } from '@conform-to/react'
import { parseWithValibot } from '@conform-to/valibot'
import { SignupSchema, type SignupData } from '../_lib/signup-schema'

export function makeSignupAction({
  saveUser,
}: {
  saveUser: (user: SignupData) => Promise<{ id: number; email: string }>
}) {
  return async function signupAction(
    formData: FormData,
  ): Promise<SubmissionResult | Response> {
    const submission = parseWithValibot(formData, { schema: SignupSchema })

    if (submission.status !== 'success') {
      return submission.reply()
    }

    try {
      await saveUser(submission.value)
      // TODO: create a session for the user
      return redirect('/')
    } catch (error) {
      console.error(error)
      return submission.reply({
        formErrors: ['Something went wrong. Please try again later.'],
      })
    }
  }
}
