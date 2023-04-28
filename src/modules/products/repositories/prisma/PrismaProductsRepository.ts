import { Prisma, Products } from '@prisma/client'
import { IProductsRepository } from '../IProductsRepository'
import { prisma } from '@/lib/prisma'

class PrismaProductsRepository implements IProductsRepository {
  findBySeriesId(series_id: string): Promise<Products[]> {
    const products = prisma.products.findMany({
      where: {
        series_id,
      },
    })

    return products
  }

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
