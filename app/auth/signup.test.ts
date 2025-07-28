import { test, expect } from 'vitest'
import type { AppLoadContext } from 'react-router'
import { action } from './signup'

test('signup action with valid form data', async () => {
  const formData = new FormData()
  const email = 'test@example.com'
  const password = 's0meR4nd0mP455w0rd'
  formData.set('email', email)
  formData.set('password', password)

  const result = await action({
    request: new Request('http://app.com/signup', {
      method: 'POST',
      body: formData,
    }),
    params: {},
    // For now we don't care about the context in tests, in future we may need to mock it
    context: {} as AppLoadContext,
  })

  expect(result).toEqual({
    result: 'success',
    payload: {
      email,
      password,
    },
    issues: null,
  })
})
