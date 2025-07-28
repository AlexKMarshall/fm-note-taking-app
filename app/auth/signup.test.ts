import { test, expect, assert } from 'vitest'
import type { AppLoadContext } from 'react-router'
import { faker } from '@faker-js/faker'
import { action } from './signup'

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

function makeSignupRequest(
  payload: Partial<ReturnType<typeof makeSignupPayload>> = {},
) {
  const formData = makeSignupFormData(payload)
  return new Request('http://app.com/signup', {
    method: 'POST',
    body: formData,
  })
}

function callSignupAction(request: Request) {
  return action({
    request,
    params: {},
    // For now we don't care about the context in tests, in future we may need to mock it
    context: {} as AppLoadContext,
  })
}

test('valid form data redirects to homepage', async () => {
  const payload = makeSignupPayload()
  const request = makeSignupRequest(payload)

  const result = await callSignupAction(request)

  assert(result instanceof Response, 'Expected a response')
  expect(result.status).toBe(302)
  expect(result.headers.get('Location')).toBe('/')
})

test('invalid form data', async () => {
  const request = makeSignupRequest({ email: '' })

  const result = await callSignupAction(request)

  expect(result).toEqual(
    expect.objectContaining({
      status: 'error',
    }),
  )
})
