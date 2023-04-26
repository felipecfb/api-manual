import { Prisma, Series } from '@prisma/client'
import { ISeriesRepository } from '../repositories/ISeriesRepository'
import { randomUUID } from 'crypto'

class InMemorySeriesRepository implements ISeriesRepository {
  public series: Series[] = []

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

  async fetchSeries(
    page: number,
    query?: string | undefined,
  ): Promise<Series[]> {
    if (query) {
      return this.series.filter((series) =>
        series.name.toLowerCase().includes(query.toLowerCase()),
      )
    }

    const categories = this.series.splice((page - 1) * 20, page * 20)

    return categories
  }
}

export { InMemorySeriesRepository }
