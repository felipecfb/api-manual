import { Category } from '@prisma/client'
import { ICategoriesRepository } from '../repositories/ICategoriesRepository'
import { CategoryNotExistsError } from '@/modules/series/errors/category-not-exists-error'

interface IGetCategoryUseCaseRequest {
  id: string
}

class GetCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ id }: IGetCategoryUseCaseRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new CategoryNotExistsError()
    }

    return category
  }
}

export { GetCategoryUseCase }
