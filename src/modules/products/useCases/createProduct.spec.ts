import { beforeEach, describe, expect, it } from 'vitest'
import { CreateProductUseCase } from './createProduct'
import { InMemorySeriesRepository } from '@/modules/series/repositories/in-memory/InMemorySeriesRepository'
import { SeriesNotExistsError } from '../errors/series-not-exists-error'
import { InMemoryProductsRepository } from '../repositories/in-memory/InMemoryProductsRepository'
import { ProductAlreadyExists } from '../errors/product-already-exists-error'

let seriesRepository: InMemorySeriesRepository
let productsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Category', () => {
  beforeEach(() => {
    seriesRepository = new InMemorySeriesRepository()
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(seriesRepository, productsRepository)
  })

  it('should be able to create a new product', async () => {
    const series = await seriesRepository.create({
      id: 'series-id',
      name: 'Series Name',
      slug: 'series-name',
      category_id: 'category-id',
    })

    const { product } = await sut.execute({
      name: 'Product Name',
      series_id: series.id,
    })

    expect(product).toHaveProperty('id', product.id)
  })

  it('should not be able to create a new product with same name', async () => {
    const series = await seriesRepository.create({
      id: 'series-id',
      name: 'Series Name',
      slug: 'series-name',
      category_id: 'category-id',
    })

    await sut.execute({
      name: 'Same name',
      series_id: series.id,
    })

    await expect(() =>
      sut.execute({
        name: 'Same name',
        series_id: series.id,
      }),
    ).rejects.toBeInstanceOf(ProductAlreadyExists)
  })

  it('should not be able to create a new product with inexistent series', async () => {
    await expect(() =>
      sut.execute({
        name: 'Product Name',
        series_id: 'series-id',
      }),
    ).rejects.toBeInstanceOf(SeriesNotExistsError)
  })
})
