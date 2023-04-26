import { Category } from '@prisma/client'
import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface IFetchCategoriesUseCaseRequest {
  page: number
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
  }: IFetchCategoriesUseCaseRequest): Promise<IFetchCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.fetchCategories(page)

    return {
      categories,
      page,
    }
  }
}

export { FetchCategoriesUseCase }
