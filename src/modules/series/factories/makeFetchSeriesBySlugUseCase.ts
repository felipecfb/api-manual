import { PrismaSeriesRepository } from '../repositories/prisma/PrismaSeriesRepository'
import { FetchSeriesBySlugUseCase } from '../useCases/fetchSeriesBySlug'

export function makeFetchSeriesBySlugUseCase(): FetchSeriesBySlugUseCase {
  const seriesRepository = new PrismaSeriesRepository()
  const fetchSeriesBySlugUseCase = new FetchSeriesBySlugUseCase(
    seriesRepository,
  )

  return fetchSeriesBySlugUseCase
}
