import { faker } from '@faker-js/faker'
import { assert, expect, test } from 'vitest'
import { loginAction } from './login-action'

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

test('valid form data redirects to homepage', async () => {
  const payload = makeLoginPayload()
  const formData = makeLoginFormData(payload)

  const result = await loginAction(formData)

  assert(result instanceof Response, 'Expected a response')

  expect(result.status).toBe(302)
  expect(result.headers.get('Location')).toBe('/')
})

test('invalid form data', async () => {
  const formData = makeLoginFormData({ email: '' })

  const result = await loginAction(formData)

  expect(result).toEqual(
    expect.objectContaining({
      status: 'error',
    }),
  )
})
