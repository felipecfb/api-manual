import { Category } from '@prisma/client'
import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface ISearchCategoriesUseCaseRequest {
  query: string
  page: number
}

interface ISearchCategoriesUseCaseResponse {
  categories: Category[]
}

export class SearchCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({
    query,
    page,
  }: ISearchCategoriesUseCaseRequest): Promise<ISearchCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.searchManyCategories(
      query,
      page,
    )

    return {
      categories,
    }
  }
}
