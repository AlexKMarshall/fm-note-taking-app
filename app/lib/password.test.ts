import { test, expect } from 'vitest'
import { hashPassword, verifyPassword } from './password'

test('hashes password', async () => {
  const password = 'password'
  const hash = await hashPassword(password)
  expect(hash).not.toBe(password)
})

test('salts passwords so the same password hashes to different values', async () => {
  const password = 'password'
  const hash1 = await hashPassword(password)
  const hash2 = await hashPassword(password)
  expect(hash1).not.toBe(hash2)
})

test('verifies correct password', async () => {
  const password = 'password'
  const hash = await hashPassword(password)
  expect(await verifyPassword(password, hash)).toBe(true)
})

test('detects incorrect password', async () => {
  const password = 'password'
  const hash = await hashPassword(password)
  expect(await verifyPassword('wrong', hash)).toBe(false)
})
