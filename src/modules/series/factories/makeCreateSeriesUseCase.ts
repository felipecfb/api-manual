import { PrismaCategoriesRepository } from '@/modules/category/repositories/prisma/PrismaCategoriesRepository'
import { PrismaSeriesRepository } from '../repositories/prisma/PrismaSeriesRepository'
import { CreateSeriesUseCase } from '../useCases/createSeries'

export function makeCreateSeriesUseCase(): CreateSeriesUseCase {
  const categoriesRepository = new PrismaCategoriesRepository()
  const seriesRepository = new PrismaSeriesRepository()
  const createSeriesUseCase = new CreateSeriesUseCase(
    categoriesRepository,
    seriesRepository,
  )

  return createSeriesUseCase
}
