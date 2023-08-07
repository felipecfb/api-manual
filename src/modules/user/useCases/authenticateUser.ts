import { User } from '@prisma/client'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { InvalidCredentialsError } from '../errors/invalidy-credentials-error'
import { compare } from 'bcryptjs'

interface IAuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface IAuthenticateUserUseCaseResponse {
  user: User
}

class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserUseCaseRequest): Promise<IAuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

export { AuthenticateUserUseCase }
