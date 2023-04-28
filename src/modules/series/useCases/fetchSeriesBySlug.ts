import { Series } from '@prisma/client'
import { ISeriesRepository } from '../repositories/ISeriesRepository'
import { SeriesNotExistsError } from '@/modules/products/errors/series-not-exists-error'

interface IFetchSeriesBySlugUseCaseRequest {
  slug: string
}

interface IFetchSeriesBySlugUseCaseResponse {
  series: Series | null
}

class FetchSeriesBySlugUseCase {
  constructor(private seriesRepository: ISeriesRepository) {}

  async execute({
    slug,
  }: IFetchSeriesBySlugUseCaseRequest): Promise<IFetchSeriesBySlugUseCaseResponse> {
    const series = await this.seriesRepository.findBySlug(slug)

    if (!series) {
      throw new SeriesNotExistsError()
    }

    return {
      series,
    }
  }
}

export { FetchSeriesBySlugUseCase }
