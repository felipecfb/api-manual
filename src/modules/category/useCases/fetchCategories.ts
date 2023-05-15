import { Category } from '@prisma/client'
import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface IFetchCategoriesUseCaseRequest {
  query?: string
}

class FetchCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({
    query,
  }: IFetchCategoriesUseCaseRequest): Promise<Category[]> {
    const categories = await this.categoriesRepository.fetchCategories(query)

    return categories
  }
}

export { FetchCategoriesUseCase }
