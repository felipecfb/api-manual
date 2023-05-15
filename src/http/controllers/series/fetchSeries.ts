import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchSeriesUseCase } from '@/modules/series/factories/makeFetchSeriesUseCase'

export async function fetchSeries(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchSeriesQuerySchema = z.object({
    query: z.string().optional(),
  })

  const { query } = fetchSeriesQuerySchema.parse(request.query)

  try {
    const fetchSeriesUseCase = makeFetchSeriesUseCase()

    const response = await fetchSeriesUseCase.execute({
      query,
    })

    return reply.status(200).send(response)
  } catch (err: any) {
    return reply.status(500).send({
      message: err.message,
    })
  }
}
