import { PrismaSeriesRepository } from '@/modules/series/repositories/prisma/PrismaSeriesRepository'
import { CreateProductUseCase } from '../useCases/createProduct'
import { PrismaProductsRepository } from '../repositories/prisma/PrismaProductsRepository'

export function makeCreateProductUseCase(): CreateProductUseCase {
  const seriesRepository = new PrismaSeriesRepository()
  const productsRepository = new PrismaProductsRepository()
  const createProductUseCase = new CreateProductUseCase(
    seriesRepository,
    productsRepository,
  )

  return createProductUseCase
}
