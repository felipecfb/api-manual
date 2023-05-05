import { SeriesNotExistsError } from '@/modules/products/errors/series-not-exists-error'
import { makeFetchSeriesBySlugUseCase } from '@/modules/series/factories/makeFetchSeriesBySlugUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchSeriesBySlug(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchSeriesBySlugParamsSchema = z.object({
    slug: z.string(),
  })

  const { slug } = fetchSeriesBySlugParamsSchema.parse(request.params)

  try {
    const fetchSeriesBySlugUseCase = makeFetchSeriesBySlugUseCase()

    const { series } = await fetchSeriesBySlugUseCase.execute({
      slug,
    })

    return reply.status(200).send(series)
  } catch (err) {
    if (err instanceof SeriesNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
