import { validateEnvironment } from '../app/environment.server'

export const validatedTestEnvironment = validateEnvironment(process.env)
