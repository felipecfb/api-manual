import { Series } from '@prisma/client'
import { ISeriesRepository } from '../repositories/ISeriesRepository'

interface IFetchSeriesUseCaseRequest {
  query?: string
}

class FetchSeriesUseCase {
  constructor(private seriesRepository: ISeriesRepository) {}

  async execute({ query }: IFetchSeriesUseCaseRequest): Promise<Series[]> {
    const series = await this.seriesRepository.fetchSeries(query)

    return series
  }
}

export { FetchSeriesUseCase }
