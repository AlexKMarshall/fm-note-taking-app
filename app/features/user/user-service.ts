import { eq } from 'drizzle-orm'
import type { Database } from '~/database/index'
import { hashPassword, verifyPassword } from '~/lib/password'
import { users } from '~/database/schema'

type User = {
  id: number
  email: string
}

type SignupDto = {
  email: string
  password: string
}

type VerifyPasswordDto = {
  email: string
  password: string
}

export interface IUserService {
  signup(signupDto: SignupDto): Promise<User>
  isEmailUnique(email: string): Promise<boolean>
  getUserByEmail(email: string): Promise<User | null>
  verifyPassword(verifyPasswordDto: VerifyPasswordDto): Promise<boolean>
}

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async signup({ email, password }: SignupDto) {
    const passwordHash = await hashPassword(password)
    return this.userRepository.create({
      user: { email },
      password: { hash: passwordHash },
    })
  }

  async getUserByEmail(email: string) {
    return this.userRepository.get({ email })
  }

  async isEmailUnique(email: string) {
    const user = await this.userRepository.get({ email })
    return user === null
  }

  async verifyPassword({ email, password }: VerifyPasswordDto) {
    const passwordHash = await this.userRepository.getUserPasswordHash({
      email,
    })
    if (!passwordHash) {
      return false
    }
    return verifyPassword(password, passwordHash)
  }
}

export interface IUserRepository {
  create(createUserDto: {
    user: { email: string }
    password: { hash: string }
  }): Promise<User>

  get(getDto: { id: number } | { email: string }): Promise<User | null>

  getUserPasswordHash(
    getDto: { id: number } | { email: string },
  ): Promise<string | null>
}

export class UserRepository implements IUserRepository {
  constructor(private readonly db: Database) {}

  async create(createUserDto: {
    user: { email: string }
    password: { hash: string }
  }) {
    const [user] = await this.db
      .insert(users)
      .values({
        email: createUserDto.user.email,
        passwordHash: createUserDto.password.hash,
      })
      .returning({ id: users.id, email: users.email })

    if (!user) {
      throw new Error('Failed to create user')
    }

    return user
  }

  async get(getDto: { id: number } | { email: string }) {
    if ('id' in getDto) {
      const [user] = await this.db
        .select({ id: users.id, email: users.email })
        .from(users)
        .where(eq(users.id, getDto.id))
      return user ?? null
    }

    const [user] = await this.db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.email, getDto.email))
    return user ?? null
  }

  // TODO: this seems weird to get the password hash in a separate method,
  // but we'll be moving it to a separate table soon, and the extra db round trip
  // seems worth it to ensure we never get the password hash returned from other queries that
  // don't explicitly ask for it
  async getUserPasswordHash(getDto: { id: number } | { email: string }) {
    if ('id' in getDto) {
      const [user] = await this.db
        .select({ passwordHash: users.passwordHash })
        .from(users)
        .where(eq(users.id, getDto.id))
      return user?.passwordHash ?? null
    }

    const [user] = await this.db
      .select({ passwordHash: users.passwordHash })
      .from(users)
      .where(eq(users.email, getDto.email))
    return user?.passwordHash ?? null
  }
}
