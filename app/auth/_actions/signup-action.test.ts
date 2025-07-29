import { faker } from '@faker-js/faker'
import { assert, expect, test, vi } from 'vitest'
import { makeSignupAction } from './signup-action'

const mockSaveUser = vi.fn()
mockSaveUser.mockName('saveUser')

const signupAction = makeSignupAction({
  saveUser: mockSaveUser,
})

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
  const payload = makeSignupPayload()
  const formData = makeSignupFormData(payload)

  const result = await signupAction(formData)

  assert(result instanceof Response, 'Expected a response')
  expect(mockSaveUser).toHaveBeenCalledWith(payload)
  expect(result.status).toBe(302)
  expect(result.headers.get('Location')).toBe('/')
})

test('invalid form data', async () => {
  const formData = makeSignupFormData({ email: '' })

  const result = await signupAction(formData)

  expect(result).toEqual(
    expect.objectContaining({
      status: 'error',
    }),
  )
  expect(mockSaveUser).not.toHaveBeenCalled()
})
