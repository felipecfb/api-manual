import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCategoriesRepository } from '@/modules/category/repositories/in-memory/InMemoryCategoriesRepository'
import { InMemorySeriesRepository } from '../repositories/in-memory/InMemorySeriesRepository'
import { FetchSeriesBySlugUseCase } from './fetchSeriesBySlug'
import { SeriesNotExistsError } from '@/modules/products/errors/series-not-exists-error'

let categoriesRepository: InMemoryCategoriesRepository
let seriesRepository: InMemorySeriesRepository
let sut: FetchSeriesBySlugUseCase

describe('Fetch Series By Slug', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    seriesRepository = new InMemorySeriesRepository()
    sut = new FetchSeriesBySlugUseCase(seriesRepository)
  })

  it('should be able to fetch series by slug', async () => {
    const category = await categoriesRepository.create({
      name: 'Category 1',
      slug: 'category-1',
    })

    const { slug } = await seriesRepository.create({
      name: 'Series',
      slug: 'series',
      category_id: category.id,
    })

    const { series } = await sut.execute({
      slug,
    })

    expect(series).toHaveProperty('id')
  })

  it('should not be able to fetch series by slug if not exists', async () => {
    await expect(() =>
      sut.execute({
        slug: 'fake-slug',
      }),
    ).rejects.toBeInstanceOf(SeriesNotExistsError)
  })
})
