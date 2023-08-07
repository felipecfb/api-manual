import { PrismaCategoriesRepository } from '../repositories/prisma/PrismaCategoriesRepository'
import { GetCategoryUseCase } from '../useCases/getCategory'

export function makeGetCategoryUseCase(): GetCategoryUseCase {
  const categoriesRepository = new PrismaCategoriesRepository()
  const getCategoryUseCase = new GetCategoryUseCase(categoriesRepository)

  return getCategoryUseCase
}
