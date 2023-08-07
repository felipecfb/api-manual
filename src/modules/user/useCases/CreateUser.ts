import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface ICreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface ICreateUserUseCaseResponse {
  user: User
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserUseCaseRequest): Promise<ICreateUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findUserByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}

export { CreateUserUseCase }
