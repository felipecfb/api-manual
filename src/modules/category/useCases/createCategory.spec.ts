import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCategoriesRepository } from '../repositories/in-memory/InMemoryCategoriesRepository'
import { CreateCategoryUseCase } from './createCategory'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'

let categoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoriesRepository)
  })

  it('should be able to create a new category', async () => {
    const { category } = await sut.execute({
      name: 'Category Name',
    })

    expect(category).toHaveProperty('id', category.id)
  })

  it('should not be able to create a new category with same slug twice', async () => {
    await sut.execute({
      name: 'Category Name',
    })

    await expect(
      sut.execute({
        name: 'Category Name',
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError)
  })
})
