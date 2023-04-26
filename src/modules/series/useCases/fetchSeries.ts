import { Series } from '@prisma/client'
import { ISeriesRepository } from '../repositories/ISeriesRepository'

interface IFetchSeriesUseCaseRequest {
  page: number
  query?: string
}

interface IFetchSeriesUseCaseResponse {
  series: Series[]
  page: number
  nextPage?: number
}

class FetchSeriesUseCase {
  constructor(private seriesRepository: ISeriesRepository) {}

  async execute({
    page,
    query,
  }: IFetchSeriesUseCaseRequest): Promise<IFetchSeriesUseCaseResponse> {
    const series = await this.seriesRepository.fetchSeries(page, query)

    return {
      series,
      page,
    }
  }
}

export { FetchSeriesUseCase }
