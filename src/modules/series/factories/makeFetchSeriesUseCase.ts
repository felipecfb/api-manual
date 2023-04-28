import { PrismaSeriesRepository } from '../repositories/prisma/PrismaSeriesRepository'
import { FetchSeriesUseCase } from '../useCases/fetchSeries'

export function makeFetchSeriesUseCase(): FetchSeriesUseCase {
  const seriesRepository = new PrismaSeriesRepository()
  const fetchSeriesUseCase = new FetchSeriesUseCase(seriesRepository)

  return fetchSeriesUseCase
}
