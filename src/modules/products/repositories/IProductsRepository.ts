import { Prisma, Products } from '@prisma/client'

export interface IProductsRepository {
  create(data: Prisma.ProductsCreateManyInput): Promise<Products>
  findBySlug(slug: string): Promise<Products | null>
}
