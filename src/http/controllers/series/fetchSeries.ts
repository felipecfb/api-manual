import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchSeriesUseCase } from '@/modules/series/factories/makeFetchSeriesUseCase'

export async function fetchSeries(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchSeriesQuerySchema = z.object({
    page: z.coerce.string(),
    query: z.string().optional(),
  })

  const { page, query } = fetchSeriesQuerySchema.parse(request.query)

  try {
    const fetchSeriesUseCase = makeFetchSeriesUseCase()

    const { series } = await fetchSeriesUseCase.execute({
      page: Number(page),
      query,
    })

    return reply.status(200).send({
      series,
    })
  } catch (err) {
    console.log(err)
  }
}
