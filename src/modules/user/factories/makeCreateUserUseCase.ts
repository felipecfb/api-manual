import { PrismaUsersRepository } from '../repositories/prisma/PrismaUsersRepository'
import { CreateUserUseCase } from '../useCases/CreateUser'

export function makeCreateUserUseCase(): CreateUserUseCase {
  const usersRepository = new PrismaUsersRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)

  return createUserUseCase
}
