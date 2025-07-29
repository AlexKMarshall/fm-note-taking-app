import { faker } from '@faker-js/faker'
import * as v from 'valibot'
import { expect, test, assert } from 'vitest'
import { LoginSchema } from './login-schema'

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

test('valid data', async () => {
  const payload = makeLoginPayload()
  const result = v.safeParse(LoginSchema, payload)
  expect(result).toEqual({
    success: true,
    output: payload,
    issues: undefined,
    typed: true,
  })
})

test('missing email', async () => {
  const payload = makeLoginPayload({ email: '' })
  const result = v.safeParse(LoginSchema, payload)

  assert(!result.success, 'Expected validation to fail')

  const flattenedIssues = v.flatten<typeof LoginSchema>(result.issues)

  expect(flattenedIssues).toEqual({
    nested: {
      email: ['Please enter an email address'],
    },
  })
})

test('missing password', async () => {
  const payload = makeLoginPayload({ password: '' })
  const result = v.safeParse(LoginSchema, payload)

  assert(!result.success, 'Expected validation to fail')

  const flattenedIssues = v.flatten<typeof LoginSchema>(result.issues)

  expect(flattenedIssues).toEqual({
    nested: {
      password: ['Please enter a password'],
    },
  })
})

test('invalid email', async () => {
  const payload = makeLoginPayload({ email: 'invalid-email' })
  const result = v.safeParse(LoginSchema, payload)

  assert(!result.success, 'Expected validation to fail')

  const flattenedIssues = v.flatten<typeof LoginSchema>(result.issues)

  expect(flattenedIssues).toEqual({
    nested: {
      email: ['Please enter a valid email address'],
    },
  })
})
