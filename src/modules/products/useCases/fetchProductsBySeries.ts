import { Products } from '@prisma/client'
import { IProductsRepository } from '../repositories/IProductsRepository'
import { ISeriesRepository } from '@/modules/series/repositories/ISeriesRepository'
import { SeriesNotExistsError } from '../errors/series-not-exists-error'

interface IFetchProductsBySeriesUseCaseRequest {
  series_id: string
}

class FetchProductsBySeriesUseCase {
  constructor(
    private seriesRepository: ISeriesRepository,
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    series_id,
  }: IFetchProductsBySeriesUseCaseRequest): Promise<Products[]> {
    const series = await this.seriesRepository.findById(series_id)

    if (!series) {
      throw new SeriesNotExistsError()
    }

    const products = await this.productsRepository.findBySeriesId(series.id)

    return products
  }
}

export { FetchProductsBySeriesUseCase }
