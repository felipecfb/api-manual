import { Prisma, Products } from '@prisma/client'

export interface IProductsRepository {
  create(data: Prisma.ProductsCreateManyInput): Promise<Products>
  findBySlug(slug: string): Promise<Products | null>
  findBySeriesId(series_id: string): Promise<Products[]>
  fetchProducts(query?: string): Promise<Products | Products[]>
}
