import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCategoriesRepository } from '@/modules/category/repositories/in-memory/InMemoryCategoriesRepository'
import { InMemorySeriesRepository } from '../repositories/in-memory/InMemorySeriesRepository'
import { FetchSeriesUseCase } from './fetchSeries'

let categoriesRepository: InMemoryCategoriesRepository
let seriesRepository: InMemorySeriesRepository
let sut: FetchSeriesUseCase

describe('Fetch series', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    seriesRepository = new InMemorySeriesRepository()
    sut = new FetchSeriesUseCase(seriesRepository)
  })

  it('should be able to fetch all series', async () => {
    const category = await categoriesRepository.create({
      name: 'Category 1',
      slug: 'category-1',
    })

    await seriesRepository.create({
      name: 'Series 1',
      slug: 'series-1',
      category_id: category.id,
    })

    await seriesRepository.create({
      name: 'Series 2',
      slug: 'series-2',
      category_id: category.id,
    })

    const { series } = await sut.execute({
      page: 1,
    })

    expect(series).toHaveLength(2)
    expect(series).toEqual([
      expect.objectContaining({ name: 'Series 1' }),
      expect.objectContaining({ name: 'Series 2' }),
    ])
  })

  it('should be able to fetch paginated all series', async () => {
    const category = await categoriesRepository.create({
      name: 'Category 1',
      slug: 'category-1',
    })

    for (let i = 1; i <= 22; i++) {
      await seriesRepository.create({
        name: `Series ${i}`,
        slug: `series-${i}`,
        category_id: category.id,
      })
    }

    const { series } = await sut.execute({
      page: 2,
    })

    expect(series).toHaveLength(2)
    expect(series).toEqual([
      expect.objectContaining({ name: 'Series 21' }),
      expect.objectContaining({ name: 'Series 22' }),
    ])
  })

  it('should be able to search for series', async () => {
    const category = await categoriesRepository.create({
      name: 'Category 1',
      slug: 'category-1',
    })

    await seriesRepository.create({
      name: 'Search series',
      slug: 'search-series',
      category_id: category.id,
    })

    await seriesRepository.create({
      name: 'Series 2',
      slug: 'series-2',
      category_id: category.id,
    })

    const { series } = await sut.execute({
      page: 2,
      query: 'search',
    })

    expect(series).toHaveLength(1)
    expect(series).toEqual([expect.objectContaining({ name: 'Search series' })])
  })
})
