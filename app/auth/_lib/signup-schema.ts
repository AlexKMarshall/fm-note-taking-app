import * as v from 'valibot'

/**
 * Transforms an empty string to undefined.
 * This can be used to show different error messages for empty form fields compared with non-empty invalid fields
 */
const transformEmptyStringToUndefined = v.transform((value) => {
  if (typeof value !== 'string') {
    return value
  }

  if (value.trim() === '') {
    return undefined
  }

  return value
})

export const SignupSchema = v.object({
  email: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.string('Please enter an email address'),
    v.email('Please enter a valid email address'),
  ),
  password: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.string('Please enter a password'),
    v.minLength(8, 'Password must be at least 8 characters long'),
  ),
})
export type SignupData = v.InferOutput<typeof SignupSchema>
