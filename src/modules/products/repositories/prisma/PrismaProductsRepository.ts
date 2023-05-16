import { Prisma, Products } from '@prisma/client'
import { IProductsRepository } from '../IProductsRepository'
import { prisma } from '@/lib/prisma'

class PrismaProductsRepository implements IProductsRepository {
  async fetchProducts(
    query?: string | undefined,
  ): Promise<Products | Products[]> {
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: query?.toLowerCase(),
        },
      },
    })

    if (products.length === 1) {
      return products[0]
    }

    return products
  }

  async findBySeriesId(series_id: string): Promise<Products[]> {
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
