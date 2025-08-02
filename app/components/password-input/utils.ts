import { getInputProps } from '@conform-to/react'
import type { FieldMetadata } from '@conform-to/react'

// Type for password input options (InputOptions without the type field)
type PasswordInputOptions = {
  ariaAttributes?: true | false
  ariaInvalid?: 'errors' | 'allErrors'
  ariaDescribedBy?: string
  value?: boolean
}

// Type for the return value (InputProps without the type field)
type PasswordInputProps = Omit<ReturnType<typeof getInputProps>, 'type'>

/**
 * A wrapper around getInputProps specifically for password inputs.
 *
 * This function:
 * 1. Omits the 'type' field from the options object (hardcodes it to 'password')
 * 2. Removes the 'type' key from the returned props
 *
 * This is useful when you want to use conform's getInputProps functionality
 * but need to control the type yourself (like in a PasswordInput component
 * that toggles between 'password' and 'text').
 */
export function getPasswordInputProps<Schema>(
  metadata: FieldMetadata<Schema, Record<string, unknown>, string[]>,
  options: PasswordInputOptions = {},
): PasswordInputProps {
  // Call getInputProps with hardcoded type: 'password'
  const inputProps = getInputProps(metadata, {
    ...options,
    type: 'password',
  } as Parameters<typeof getInputProps>[1])

  // Remove the type field from the returned props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type: _type, ...passwordInputProps } = inputProps

  return passwordInputProps
}
