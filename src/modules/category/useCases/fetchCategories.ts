import { Category } from '@prisma/client'
import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface IFetchCategoriesUseCaseRequest {
  page: number
  query?: string
}

interface IFetchCategoriesUseCaseResponse {
  categories: Category[]
  page: number
  nextPage?: number
}

class FetchCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({
    page,
    query,
  }: IFetchCategoriesUseCaseRequest): Promise<IFetchCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.fetchCategories(
      page,
      query,
    )

    console.log(categories)

    return {
      categories,
      page,
    }
  }
}

export { FetchCategoriesUseCase }
