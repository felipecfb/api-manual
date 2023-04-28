import { ProductAlreadyExists } from '@/modules/products/errors/product-already-exists-error'
import { SeriesNotExistsError } from '@/modules/products/errors/series-not-exists-error'
import { makeFetchProductsBySeriesUseCase } from '@/modules/products/factories/makeFetchProductsBySeriesId'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchProductsBySeries(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchProductsBySeriesParamsSchema = z.object({
    series_id: z.string(),
  })

  const { series_id } = fetchProductsBySeriesParamsSchema.parse(request.params)

  try {
    const fetchProductsBySeries = makeFetchProductsBySeriesUseCase()

    const { products } = await fetchProductsBySeries.execute({
      series_id,
    })

    return reply.status(201).send({
      products,
    })
  } catch (err) {
    if (err instanceof SeriesNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof ProductAlreadyExists) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
