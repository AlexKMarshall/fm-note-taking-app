import * as v from 'valibot'

const EnvironmentSchema = v.object({
  SESSION_SECRET: v.pipe(v.string(), v.nonEmpty(), v.minLength(32)),
  ENVIRONMENT: v.union([
    v.literal('production'),
    v.literal('development'),
    v.literal('test'),
  ]),
})
export type EnvironmentData = v.InferOutput<typeof EnvironmentSchema>

export function validateEnvironment(env: unknown) {
  return v.parse(EnvironmentSchema, env)
}
