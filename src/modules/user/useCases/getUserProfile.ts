import { User } from '@prisma/client'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { UserNotExistsError } from '../errors/user-not-exists'

interface IGetUserProfileUseCaseRequest {
  userId: string
}

interface IGetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findUserById(userId)

    if (!user) {
      throw new UserNotExistsError()
    }

    return {
      user,
    }
  }
}
