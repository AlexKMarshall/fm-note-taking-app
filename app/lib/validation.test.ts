import { describe, test, expect } from 'vitest'
import * as v from 'valibot'
import { transformEmptyStringToUndefined } from './validation'

describe('transformEmptyStringToUndefined', () => {
  test('non empty string returns as is', () => {
    const result = v.parse(
      v.pipe(v.unknown(), transformEmptyStringToUndefined),
      'test',
    )

    expect(result).toBe('test')
  })

  test('empty string returns undefined', () => {
    const result = v.parse(
      v.pipe(v.unknown(), transformEmptyStringToUndefined),
      '',
    )

    expect(result).toBeUndefined()
  })

  test('non string returns as is', () => {
    const nonStringValues = [1, true, false, null, undefined, {}, []]
    for (const value of nonStringValues) {
      const result = v.parse(
        v.pipe(v.unknown(), transformEmptyStringToUndefined),
        value,
      )

      expect(result).toBe(value)
    }
  })
})
