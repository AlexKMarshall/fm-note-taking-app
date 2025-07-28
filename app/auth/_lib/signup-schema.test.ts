import { faker } from '@faker-js/faker'
import * as v from 'valibot'
import { expect, test, assert } from 'vitest'
import { SignupSchema } from './signup-schema'

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

test('valid data', async () => {
  const payload = makeSignupPayload()
  const result = v.safeParse(SignupSchema, payload)
  expect(result).toEqual({
    success: true,
    output: payload,
    issues: undefined,
    typed: true,
  })
})

test('missing email', async () => {
  const payload = makeSignupPayload({ email: '' })
  const result = v.safeParse(SignupSchema, payload)

  assert(!result.success, 'Expected validation to fail')

  const flattenedIssues = v.flatten<typeof SignupSchema>(result.issues)

  expect(flattenedIssues).toEqual({
    nested: {
      email: ['Please enter an email address'],
    },
  })
})

test('missing password', async () => {
  const payload = makeSignupPayload({ password: '' })
  const result = v.safeParse(SignupSchema, payload)

  assert(!result.success, 'Expected validation to fail')

  const flattenedIssues = v.flatten<typeof SignupSchema>(result.issues)

  expect(flattenedIssues).toEqual({
    nested: {
      password: ['Please enter a password'],
    },
  })
})
test('password too short', async () => {
  const payload = makeSignupPayload({ password: 'short' })
  const result = v.safeParse(SignupSchema, payload)

  assert(!result.success, 'Expected validation to fail')

  const flattenedIssues = v.flatten<typeof SignupSchema>(result.issues)

  expect(flattenedIssues).toEqual({
    nested: {
      password: ['Password must be at least 8 characters long'],
    },
  })
})
test('invalid email', async () => {
  const payload = makeSignupPayload({ email: 'invalid-email' })
  const result = v.safeParse(SignupSchema, payload)

  assert(!result.success, 'Expected validation to fail')

  const flattenedIssues = v.flatten<typeof SignupSchema>(result.issues)

  expect(flattenedIssues).toEqual({
    nested: {
      email: ['Please enter a valid email address'],
    },
  })
})
