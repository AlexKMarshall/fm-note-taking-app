import { faker } from '@faker-js/faker'
import { assert, expect, test, vi } from 'vitest'
import { makeLoginAction } from './login-action'
import { UserService } from '~/features/user/user-service'
import { hashPassword } from '~/lib/password'
import { createSessionStorage } from '~/session.server'

function makeLoginPayload({
  email = faker.internet.email(),
  password = faker.internet.password({ length: 8 }),
}: {
  email?: string
  password?: string
} = {}) {
  return {
    email,
    password,
  }
}

function makeLoginFormData({
  email,
  password,
}: { email?: string; password?: string } = {}) {
  const payload = makeLoginPayload({ email, password })
  const formData = new FormData()
  formData.set('email', payload.email)
  formData.set('password', payload.password)
  return formData
}

function makeUser({ id, email }: Partial<{ id: number; email: string }> = {}) {
  return {
    id: id ?? faker.number.int(),
    email: email ?? faker.internet.email(),
  }
}

test('valid form data redirects to homepage', async () => {
  const payload = makeLoginPayload()
  const formData = makeLoginFormData(payload)
  const user = makeUser({ email: payload.email })

  const mockUserService = new UserService({
    create: vi.fn(),
    get: async () => user,
    getUserPasswordHash: () => hashPassword(payload.password),
  })

  const mockSessionStorage = createSessionStorage({
    SESSION_SECRET: 'test',
    ENVIRONMENT: 'test',
  })

  const loginAction = makeLoginAction({
    userService: mockUserService,
  })

  const result = await loginAction({
    formData,
    sessionStorage: mockSessionStorage,
  })

  assert(result instanceof Response, 'Expected a response')

  expect.soft(result.status).toBe(302)
  expect.soft(result.headers.get('Location')).toBe('/')
  // TODO: test that the session is set
})

// test('invalid form data', async () => {
//   const formData = makeLoginFormData({ email: '' })

//   const result = await loginAction(formData)

//   expect(result).toEqual(
//     expect.objectContaining({
//       status: 'error',
//     }),
//   )
// })
