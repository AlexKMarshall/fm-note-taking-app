import * as v from 'valibot'

/**
 * Transforms an empty string to undefined.
 * This can be used to show different error messages for empty form fields compared with non-empty invalid fields
 */
export const transformEmptyStringToUndefined = v.transform((value) => {
  if (typeof value !== 'string') {
    return value
  }

  if (value.trim() === '') {
    return undefined
  }

  return value
})
