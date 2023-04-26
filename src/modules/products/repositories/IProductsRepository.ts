import { Prisma, Products } from '@prisma/client'

export interface IProductsRepository {
  create(data: Prisma.ProductsCreateManyInput): Promise<Products>
}
