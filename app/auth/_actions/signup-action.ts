import { redirect } from 'react-router'

import { type SubmissionResult } from '@conform-to/react'
import { parseWithValibot } from '@conform-to/valibot'
import { SignupSchema } from '../_lib/signup-schema'
import { type IUserService } from '~/features/user/user-service'

export function makeSignupAction({
  userService,
}: {
  userService: IUserService
}) {
  return async function signupAction(
    formData: FormData,
  ): Promise<SubmissionResult | Response> {
    const submission = parseWithValibot(formData, { schema: SignupSchema })

    if (submission.status !== 'success') {
      return submission.reply()
    }

    try {
      const isEmailUnique = await userService.isEmailUnique(
        submission.value.email,
      )

      if (!isEmailUnique) {
        return submission.reply({
          fieldErrors: {
            email: ['Email is already used'],
          },
        })
      }

      await userService.signup(submission.value)
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
