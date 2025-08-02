import { faker } from '@faker-js/faker'
import { assert, expect, test, vi } from 'vitest'
import { makeSignupAction } from './signup-action'
import { UserService, type IUserRepository } from '~/features/user/user-service'

const mockCreateUser = vi.fn()
mockCreateUser.mockName('createUser')

const mockUserRepository: IUserRepository = {
  create: mockCreateUser,
  get: vi.fn(),
  getUserPasswordHash: vi.fn(),
}

function makeSignupPayload({
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

function makeSignupFormData({
  email,
  password,
}: { email?: string; password?: string } = {}) {
  const payload = makeSignupPayload({ email, password })
  const formData = new FormData()
  formData.set('email', payload.email)
  formData.set('password', payload.password)
  return formData
}

test('valid form data redirects to homepage', async () => {
  const signupAction = makeSignupAction({
    userService: new UserService(mockUserRepository),
  })
  const payload = makeSignupPayload()
  const formData = makeSignupFormData(payload)

  const result = await signupAction(formData)

  assert(result instanceof Response, 'Expected a response')

  expect.soft(result.status).toBe(302)
  expect.soft(result.headers.get('Location')).toBe('/')
  expect.soft(mockCreateUser).toHaveBeenCalledWith({
    user: { email: payload.email },
    password: { hash: expect.any(String) },
  })
  expect.soft(mockCreateUser).toHaveBeenCalledOnce()
})

test('invalid form data', async () => {
  const signupAction = makeSignupAction({
    userService: new UserService(mockUserRepository),
  })
  const formData = makeSignupFormData({ email: '' })

  const result = await signupAction(formData)

  expect.soft(result).toEqual(
    expect.objectContaining({
      status: 'error',
    }),
  )
  expect.soft(mockCreateUser).not.toHaveBeenCalled()
})
