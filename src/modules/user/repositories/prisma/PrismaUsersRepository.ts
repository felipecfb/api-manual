import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../IUsersRepository'
import { prisma } from '@/lib/prisma'

class PrismaUsersRepository implements IUsersRepository {
  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}

export { PrismaUsersRepository }
