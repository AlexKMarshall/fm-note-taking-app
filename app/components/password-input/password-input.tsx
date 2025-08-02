import { type ComponentProps, useState } from 'react'
import { Input, InputAdornmentButton } from '../input'

export function PasswordInput(props: Omit<ComponentProps<'input'>, 'type'>) {
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword((show) => !show)

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      {...props}
      endAdornment={
        showPassword ? (
          <InputAdornmentButton
            iconName="icon-hide-password"
            aria-label="Hide password"
            onClick={toggleShowPassword}
          />
        ) : (
          <InputAdornmentButton
            iconName="icon-show-password"
            aria-label="Show password"
            onClick={toggleShowPassword}
          />
        )
      }
    />
  )
}
