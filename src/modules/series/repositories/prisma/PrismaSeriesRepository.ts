import { Prisma, Series } from '@prisma/client'
import { ISeriesRepository } from '../ISeriesRepository'
import { prisma } from '@/lib/prisma'

class PrismaSeriesRepository implements ISeriesRepository {
  async findById(id: string): Promise<Series | null> {
    const series = prisma.series.findUnique({
      where: {
        id,
      },
    })

    return series
  }

  async findBySlug(slug: string): Promise<Series | null> {
    const series = prisma.series.findUnique({
      where: {
        slug: slug.toLowerCase().replace(' ', '-'),
      },
    })

    return series
  }

  async create(data: Prisma.SeriesCreateManyInput): Promise<Series> {
    const series = await prisma.series.create({
      data,
    })

    return series
  }

  async fetchSeries(query?: string | undefined): Promise<Series[]> {
    const series = await prisma.series.findMany({
      where: {
        name: {
          contains: query?.toLowerCase(),
        },
      },
    })

    return series
  }
}

export { PrismaSeriesRepository }
