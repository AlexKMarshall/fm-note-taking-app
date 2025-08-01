import * as v from 'valibot'
import { transformEmptyStringToUndefined } from '~/lib/validation'

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
