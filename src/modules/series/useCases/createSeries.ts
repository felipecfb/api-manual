import { Series } from '@prisma/client'
import { ISeriesRepository } from '../repositories/ISeriesRepository'
import { ICategoriesRepository } from '@/modules/category/repositories/ICategoriesRepository'
import { CategoryNotExistsError } from '../errors/category-not-exists-error'

interface ICreateSeriesUseCaseRequest {
  name: string
  slug: string
  category_id: string
}

interface ICreateSeriesUseCaseResponse {
  series: Series
}

class CreateSeriesUseCase {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private seriesRepository: ISeriesRepository,
  ) {}

  async execute({
    name,
    slug,
    category_id,
  }: ICreateSeriesUseCaseRequest): Promise<ICreateSeriesUseCaseResponse> {
    const categoriesExists = await this.categoriesRepository.findById(
      category_id,
    )

    if (!categoriesExists) {
      throw new CategoryNotExistsError()
    }

    const series = await this.seriesRepository.create({
      name,
      slug: slug.toLowerCase().replace(' ', '-'),
      category_id,
    })

    return {
      series,
    }
  }
}

export { CreateSeriesUseCase }
