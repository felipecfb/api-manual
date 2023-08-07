import { PrismaCategoriesRepository } from '../repositories/prisma/PrismaCategoriesRepository'
import { FetchCategoriesUseCase } from '../useCases/fetchCategories'

export function makeFetchCategoriesUseCase(): FetchCategoriesUseCase {
  const categoriesRepository = new PrismaCategoriesRepository()
  const fetchCategoriesUseCase = new FetchCategoriesUseCase(
    categoriesRepository,
  )

  return fetchCategoriesUseCase
}
