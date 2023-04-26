import { Prisma, Products } from '@prisma/client'
import { IProductsRepository } from '../IProductsRepository'
import { prisma } from '@/lib/prisma'

class PrismaProductsRepository implements IProductsRepository {
  async findBySlug(slug: string): Promise<Products | null> {
    const product = prisma.products.findUnique({
      where: {
        slug,
      },
    })

    return product
  }

  async create(data: Prisma.ProductsCreateManyInput): Promise<Products> {
    const product = await prisma.products.create({ data })

    return product
  }
}

export { PrismaProductsRepository }
