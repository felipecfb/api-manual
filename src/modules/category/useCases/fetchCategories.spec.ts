import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCategoriesRepository } from '../repositories/in-memory/InMemoryCategoriesRepository'
import { FetchCategoriesUseCase } from './fetchCategories'

let categoriesRepository: InMemoryCategoriesRepository
let sut: FetchCategoriesUseCase

describe('Fetch Categories', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new FetchCategoriesUseCase(categoriesRepository)
  })

  it('should be able to fetch all categories', async () => {
    await categoriesRepository.create({
      id: 'category-1',
      name: 'Category 1',
      slug: 'category-1',
    })

    await categoriesRepository.create({
      id: 'category-2',
      name: 'Category 2',
      slug: 'category-2',
    })

    const categories = await sut.execute({ page: 1 })

    expect(categories.categories.length).toBe(2)
  })

  it('should be able to fetch paginated all categories', async () => {
    for (let i = 1; i <= 22; i++) {
      await categoriesRepository.create({
        id: `category-${i}`,
        name: `Category ${i}`,
        slug: `category-${i}`,
      })
    }

    const categories = await sut.execute({ page: 2 })

    expect(categories.categories.length).toBe(2)
  })
})
