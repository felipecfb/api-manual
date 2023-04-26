import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCategoriesRepository } from '../repositories/in-memory/InMemoryCategoriesRepository'
import { SearchCategoriesUseCase } from './searchCategories'

let categoriesRepository: InMemoryCategoriesRepository
let sut: SearchCategoriesUseCase

describe('Search Categories', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new SearchCategoriesUseCase(categoriesRepository)
  })

  it('should be able to search for categories', async () => {
    await categoriesRepository.create({
      id: 'search-category',
      name: 'Search category',
      slug: 'search-category',
    })

    await categoriesRepository.create({
      id: 'category-2',
      name: 'Category 2',
      slug: 'category-2',
    })

    const { categories } = await sut.execute({
      query: 'Search',
      page: 1,
    })

    expect(categories).toHaveLength(1)
    expect(categories).toEqual([
      expect.objectContaining({ name: 'Search category' }),
    ])
  })

  it('should be able to fetch paginated categories search', async () => {
    for (let i = 1; i <= 22; i++) {
      await categoriesRepository.create({
        id: `search-category-${i}`,
        name: `Search category ${i}`,
        slug: `search-category-${i}`,
      })
    }

    const { categories } = await sut.execute({
      query: 'Search',
      page: 2,
    })

    expect(categories).toHaveLength(2)
    expect(categories).toEqual([
      expect.objectContaining({ name: 'Search category 21' }),
      expect.objectContaining({ name: 'Search category 22' }),
    ])
  })
})
