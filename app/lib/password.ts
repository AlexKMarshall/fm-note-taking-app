/**  Web Crypto API password hashing using PBKDF2 */
export async function hashPassword(password: string) {
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16))

  // Convert password to ArrayBuffer
  const encoder = new TextEncoder()
  const passwordBuffer = encoder.encode(password)

  // Import password as key
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits'],
  )

  // Derive key using PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000, // High iteration count for security
      hash: 'SHA-256',
    },
    passwordKey,
    256, // 32 bytes = 256 bits
  )

  // Combine salt and hash
  const hashArray = new Uint8Array(derivedBits)
  const combined = new Uint8Array(salt.length + hashArray.length)
  combined.set(salt)
  combined.set(hashArray, salt.length)

  // Convert to base64 string
  return btoa(String.fromCharCode(...combined))
}

export async function verifyPassword(password: string, storedHash: string) {
  try {
    // Decode stored hash
    const combined = new Uint8Array(
      atob(storedHash)
        .split('')
        .map((char) => char.charCodeAt(0)),
    )

    // Extract salt and hash
    const salt = combined.slice(0, 16)
    const storedHashArray = combined.slice(16)

    // Convert password to ArrayBuffer
    const encoder = new TextEncoder()
    const passwordBuffer = encoder.encode(password)

    // Import password as key
    const passwordKey = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits'],
    )

    // Derive key using same parameters
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      passwordKey,
      256,
    )

    // Compare hashes
    const hashArray = new Uint8Array(derivedBits)
    return (
      hashArray.length === storedHashArray.length &&
      hashArray.every((value, index) => value === storedHashArray[index])
    )
  } catch {
    return false
  }
}
