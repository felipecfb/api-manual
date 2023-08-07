import { Prisma, Series } from '@prisma/client'

export interface ISeriesRepository {
  create(data: Prisma.SeriesCreateManyInput): Promise<Series>
  fetchSeries(query?: string): Promise<Series[]>
  findBySlug(slug: string): Promise<Series | null>
  findById(id: string): Promise<Series | null>
}
