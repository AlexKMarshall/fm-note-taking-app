import { type AppLoadContext } from 'react-router'
// import { eq } from 'drizzle-orm'
import { users } from '~/database/schema'

type Database = AppLoadContext['db']

/**  Web Crypto API password hashing using PBKDF2 */
async function hashPassword(password: string): Promise<string> {
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

// Verify password against stored hash - we'll use this later
// async function verifyPassword(
//   password: string,
//   storedHash: string,
// ): Promise<boolean> {
//   try {
//     // Decode stored hash
//     const combined = new Uint8Array(
//       atob(storedHash)
//         .split('')
//         .map((char) => char.charCodeAt(0)),
//     )

//     // Extract salt and hash
//     const salt = combined.slice(0, 16)
//     const storedHashArray = combined.slice(16)

//     // Convert password to ArrayBuffer
//     const encoder = new TextEncoder()
//     const passwordBuffer = encoder.encode(password)

//     // Import password as key
//     const passwordKey = await crypto.subtle.importKey(
//       'raw',
//       passwordBuffer,
//       { name: 'PBKDF2' },
//       false,
//       ['deriveBits'],
//     )

//     // Derive key using same parameters
//     const derivedBits = await crypto.subtle.deriveBits(
//       {
//         name: 'PBKDF2',
//         salt: salt,
//         iterations: 100000,
//         hash: 'SHA-256',
//       },
//       passwordKey,
//       256,
//     )

//     // Compare hashes
//     const hashArray = new Uint8Array(derivedBits)
//     return (
//       hashArray.length === storedHashArray.length &&
//       hashArray.every((value, index) => value === storedHashArray[index])
//     )
//   } catch {
//     return false
//   }
// }

export async function createUser(
  db: Database,
  userDto: { email: string; password: string },
) {
  const passwordHash = await hashPassword(userDto.password)
  const [user] = await db
    .insert(users)
    .values({
      email: userDto.email,
      passwordHash,
    })
    .returning({ id: users.id, email: users.email })

  return user
}

// We'll use this later
// export async function verifyUserPassword(
//   db: Database,
//   email: string,
//   password: string,
// ): Promise<{ id: number; email: string } | null> {
//   const [user] = await db
//     .select({
//       id: users.id,
//       email: users.email,
//       passwordHash: users.passwordHash,
//     })
//     .from(users)
//     .where(eq(users.email, email))
//     .limit(1)

//   if (!user) {
//     return null
//   }

//   const isValid = await verifyPassword(password, user.passwordHash)
//   if (!isValid) {
//     return null
//   }

//   return { id: user.id, email: user.email }
// }
