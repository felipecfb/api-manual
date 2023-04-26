import { Prisma, Products } from '@prisma/client'
import { IProductsRepository } from '../repositories/IProductsRepository'
import { randomUUID } from 'crypto'

class InMemoryProductsRepository implements IProductsRepository {
  public products: Products[] = []

  async create({
    name,
    series_id,
  }: Prisma.ProductsCreateManyInput): Promise<Products> {
    const product = {
      id: randomUUID(),
      name,
      slug: name.toLowerCase().replace(' ', '-'),
      series_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.products.push(product)

    return product
  }
}

export { InMemoryProductsRepository }
