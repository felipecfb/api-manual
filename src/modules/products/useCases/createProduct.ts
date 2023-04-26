import { Products } from '@prisma/client'
import { IProductsRepository } from '../repositories/IProductsRepository'
import { ISeriesRepository } from '@/modules/series/repositories/ISeriesRepository'
import { SeriesNotExistsError } from '../errors/series-not-exists-error'
import { ProductAlreadyExists } from '../errors/product-already-exists-error'

interface ICreateProductUseCaseRequest {
  name: string
  series_id: string
}

interface ICreateProductUseCaseResponse {
  product: Products
}

class CreateProductUseCase {
  constructor(
    private seriesRepository: ISeriesRepository,
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    name,
    series_id,
  }: ICreateProductUseCaseRequest): Promise<ICreateProductUseCaseResponse> {
    const series = await this.seriesRepository.findById(series_id)

    if (!series) {
      throw new SeriesNotExistsError()
    }

    const product = await this.productsRepository.findBySlug(
      name.toLowerCase().replace(' ', '-'),
    )

    if (product) {
      throw new ProductAlreadyExists()
    }

    const newProduct = await this.productsRepository.create({
      name,
      slug: name.toLowerCase().replace(' ', '-'),
      series_id: series.id,
    })

    return {
      product: newProduct,
    }
  }
}

export { CreateProductUseCase }
