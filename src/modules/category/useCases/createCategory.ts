import { Category } from '@prisma/client'
import { ICategoriesRepository } from '../repositories/ICategoriesRepository'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'

interface ICreateCategoryUseCaseRequest {
  name: string
}

interface ICreateCategoryUseCaseResponse {
  category: Category
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({
    name,
  }: ICreateCategoryUseCaseRequest): Promise<ICreateCategoryUseCaseResponse> {
    const categoryWithSameName = await this.categoriesRepository.findBySlug(
      name.toLowerCase().replace(' ', '-'),
    )

    if (categoryWithSameName) {
      throw new CategoryAlreadyExistsError()
    }

    const newCategory = await this.categoriesRepository.create({
      name,
      slug: name.toLocaleLowerCase(),
    })

    return {
      category: newCategory,
    }
  }
}

export { CreateCategoryUseCase }
