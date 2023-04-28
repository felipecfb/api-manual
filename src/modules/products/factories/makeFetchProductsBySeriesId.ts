import { PrismaSeriesRepository } from '@/modules/series/repositories/prisma/PrismaSeriesRepository'
import { PrismaProductsRepository } from '../repositories/prisma/PrismaProductsRepository'
import { FetchProductsBySeriesUseCase } from '../useCases/fetchProductsBySeries'

export function makeFetchProductsBySeriesUseCase(): FetchProductsBySeriesUseCase {
  const seriesRepository = new PrismaSeriesRepository()
  const productsRepository = new PrismaProductsRepository()
  const fetchProductsBySeriesUseCase = new FetchProductsBySeriesUseCase(
    seriesRepository,
    productsRepository,
  )

  return fetchProductsBySeriesUseCase
}
