import { redirect } from 'react-router'

import { type SubmissionResult } from '@conform-to/react'
import { parseWithValibot } from '@conform-to/valibot'
import { LoginSchema } from '../_lib/login-schema'
import { UserService } from '~/features/user/user-service'
import type { SessionStorage } from '~/session.server'

export function makeLoginAction({ userService }: { userService: UserService }) {
  return async function loginAction({
    formData,
    sessionStorage,
  }: {
    formData: FormData
    sessionStorage: SessionStorage
  }): Promise<SubmissionResult | Response> {
    const submission = parseWithValibot(formData, { schema: LoginSchema })

    if (submission.status !== 'success') {
      return submission.reply()
    }

    const { email, password } = submission.value
    const [user, isPasswordValid] = await Promise.all([
      userService.getUserByEmail(email),
      userService.verifyPassword({ email, password }),
    ])

    if (!user || !isPasswordValid) {
      return submission.reply({
        formErrors: ['Invalid email or password'],
      })
    }

    const session = await sessionStorage.getSession()
    session.set('userId', user.id)

    return redirect('/', {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    })
  }
}
