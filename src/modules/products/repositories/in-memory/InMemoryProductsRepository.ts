import { Prisma, Products } from '@prisma/client'
import { randomUUID } from 'crypto'
import { IProductsRepository } from '../IProductsRepository'

class InMemoryProductsRepository implements IProductsRepository {
  public products: Products[] = []

  async fetchProducts(
    query?: string | undefined,
  ): Promise<Products | Products[]> {
    if (query) {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      )
    }

    const products = this.products

    return products
  }

  async findBySeriesId(series_id: string): Promise<Products[]> {
    const products = this.products.filter(
      (product) => product.series_id === series_id,
    )

    return products
  }

  async findBySlug(slug: string): Promise<Products | null> {
    const product = this.products.find((product) => product.slug === slug)

    if (!product) {
      return null
    }

    return product
  }

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
