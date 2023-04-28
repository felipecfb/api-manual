import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateSeriesUseCase } from '@/modules/series/factories/makeCreateSeriesUseCase'
import { SeriesAlreadyExistsError } from '@/modules/series/errors/series-already-exists-error'
import { CategoryNotExistsError } from '@/modules/series/errors/category-not-exists-error'

export async function createSeries(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSeriesBodySchema = z.object({
    name: z.string(),
    category_id: z.string(),
  })

  const { name, category_id } = createSeriesBodySchema.parse(request.body)

  try {
    const createSeriesUseCase = makeCreateSeriesUseCase()

    const { series } = await createSeriesUseCase.execute({
      name,
      slug: name.toLowerCase().replace(' ', '-'),
      category_id,
    })

    return reply.status(201).send({
      series,
    })
  } catch (err) {
    if (err instanceof SeriesAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof CategoryNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
