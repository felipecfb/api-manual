import { PrismaProductsRepository } from '../repositories/prisma/PrismaProductsRepository'
import { FetchProductsUseCase } from '../useCases/fetchProducts'

export function makeFetchProductsUseCase(): FetchProductsUseCase {
  const productsRepository = new PrismaProductsRepository()
  const fetchProduct = new FetchProductsUseCase(productsRepository)

  return fetchProduct
}
