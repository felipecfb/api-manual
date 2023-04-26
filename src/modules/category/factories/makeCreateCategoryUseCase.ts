import { PrismaCategoriesRepository } from '../repositories/prisma/PrismaCategoriesRepository'
import { CreateCategoryUseCase } from '../useCases/createCategory'

export function makeCreateCategoryUseCase(): CreateCategoryUseCase {
  const categoriesRepository = new PrismaCategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

  return createCategoryUseCase
}
