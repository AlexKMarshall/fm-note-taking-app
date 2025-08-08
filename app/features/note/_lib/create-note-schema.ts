import * as v from 'valibot'
import { transformEmptyStringToUndefined } from '~/lib/validation'

const TrimmedStringSchema = v.pipe(v.string(), v.trim())

export const CreateNoteSchema = v.object({
  title: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.optional(TrimmedStringSchema),
  ),
  tags: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.optional(TrimmedStringSchema),
  ),
  content: v.pipe(
    v.unknown(),
    transformEmptyStringToUndefined,
    v.optional(TrimmedStringSchema),
  ),
})
