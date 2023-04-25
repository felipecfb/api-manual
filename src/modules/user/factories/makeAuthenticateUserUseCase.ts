import { PrismaUsersRepository } from '../repositories/prisma/PrismaUsersRepository'
import { AuthenticateUserUseCase } from '../useCases/authenticateUserUseCase'

export function makeAuthenticateUserUseCase(): AuthenticateUserUseCase {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUserUseCase
}
