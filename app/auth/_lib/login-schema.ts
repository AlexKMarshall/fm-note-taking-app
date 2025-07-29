import * as v from 'valibot'
import { transformEmptyStringToUndefined } from '~/lib/validation'

export const LoginSchema = v.object({
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
  ),
})
export type LoginData = v.InferOutput<typeof LoginSchema>
