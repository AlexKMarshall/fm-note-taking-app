import type { Database } from '~/database/index'
import { hashPassword } from '~/utils/password'
import { users } from '~/database/schema'

type User = {
  id: number
  email: string
}

type SignupDto = {
  email: string
  password: string
}

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async signup({ email, password }: SignupDto): Promise<User> {
    const passwordHash = await hashPassword(password)
    return this.userRepository.create({
      user: { email },
      password: { hash: passwordHash },
    })
  }
}

export interface IUserRepository {
  create(createUserDto: {
    user: { email: string }
    password: { hash: string }
  }): Promise<User>
}

export class UserRepository implements IUserRepository {
  constructor(private readonly db: Database) {}

  async create(createUserDto: {
    user: { email: string }
    password: { hash: string }
  }): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values({
        email: createUserDto.user.email,
        passwordHash: createUserDto.password.hash,
      })
      .returning()

    return user
  }
}
