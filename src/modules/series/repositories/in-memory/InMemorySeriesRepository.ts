import { Prisma, Series } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ISeriesRepository } from '../ISeriesRepository'

class InMemorySeriesRepository implements ISeriesRepository {
  public series: Series[] = []

  async findById(id: string): Promise<Series | null> {
    const series = this.series.find((series) => series.id === id)

    if (!series) {
      return null
    }

    return series
  }

  async findBySlug(slug: string): Promise<Series | null> {
    const series = this.series.find(
      (series) => series.slug === slug.toLowerCase().replace(' ', '-'),
    )

    if (!series) {
      return null
    }

    return series
  }

  async create({
    name,
    slug,
    category_id,
  }: Prisma.SeriesCreateManyInput): Promise<Series> {
    const series = {
      id: randomUUID(),
      name,
      slug: slug.toLowerCase().replace(' ', '-'),
      created_at: new Date(),
      updated_at: new Date(),
      category_id,
    }

    this.series.push(series)

    return series
  }

  async fetchSeries(query?: string | undefined): Promise<Series[]> {
    if (query) {
      return this.series.filter((series) =>
        series.name.toLowerCase().includes(query.toLowerCase()),
      )
    }

    const categories = this.series

    return categories
  }
}

export { InMemorySeriesRepository }
