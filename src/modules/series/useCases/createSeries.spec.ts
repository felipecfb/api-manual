import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSeriesUseCase } from './createSeries'
import { CreateCategoryUseCase } from '@/modules/category/useCases/createCategory'
import { InMemoryCategoriesRepository } from '@/modules/category/repositories/in-memory/InMemoryCategoriesRepository'
import { CategoryNotExistsError } from '../errors/category-not-exists-error'
import { InMemorySeriesRepository } from '../repositories/in-memory/InMemorySeriesRepository'

let categoriesRepository: InMemoryCategoriesRepository
let createCategory: CreateCategoryUseCase
let seriesRepository: InMemorySeriesRepository
let createSeries: CreateSeriesUseCase

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    createCategory = new CreateCategoryUseCase(categoriesRepository)
    seriesRepository = new InMemorySeriesRepository()
    createSeries = new CreateSeriesUseCase(
      categoriesRepository,
      seriesRepository,
    )
  })

  it('should be able to create a new series', async () => {
    const { category } = await createCategory.execute({
      name: 'Category 1',
    })

    const { series } = await createSeries.execute({
      name: 'Series 1',
      slug: 'series-1',
      category_id: category.id,
    })

    expect(series).toHaveProperty('id', series.id)
  })

  it('should not be able to create a new series with inexistent category', async () => {
    await expect(() =>
      createSeries.execute({
        name: 'Series 1',
        slug: 'series-1',
        category_id: 'category-1',
      }),
    ).rejects.toBeInstanceOf(CategoryNotExistsError)
  })
})
