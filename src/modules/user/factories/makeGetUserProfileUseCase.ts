import { PrismaUsersRepository } from '../repositories/prisma/PrismaUsersRepository'
import { GetUserProfileUseCase } from '../useCases/getUserProfile'

export function makeGetUserProfileUseCase(): GetUserProfileUseCase {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
