import { test, expect, describe } from 'vitest'
import { formatDate } from './date'

describe('formatDate', () => {
  test('defaults to short day and month in en-GB', () => {
    const date = new Date('2024-01-01')
    expect(formatDate(date)).toBe('1 Jan 2024')
  })

  test('accepts options', () => {
    const date = new Date('2024-01-01')
    expect(
      formatDate(date, { day: 'numeric', month: 'numeric', year: 'numeric' }),
    ).toBe('01/01/2024')
  })

  test('accepts locale', () => {
    const date = new Date('2024-01-01')
    expect(formatDate(date, undefined, 'en-US')).toBe('Jan 1, 2024')
  })

  test('accepts a date string', () => {
    const date = new Date('2024-01-01')
    expect(formatDate(date.toISOString())).toBe('1 Jan 2024')
  })
})
