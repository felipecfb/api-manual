import { ProductAlreadyExists } from '@/modules/products/errors/product-already-exists-error'
import { SeriesNotExistsError } from '@/modules/products/errors/series-not-exists-error'
import { makeCreateProductUseCase } from '@/modules/products/factories/makeCreateProductUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProductBodySchema = z.object({
    name: z.string(),
    series_id: z.string(),
  })

  const { name, series_id } = createProductBodySchema.parse(request.body)

  try {
    const createProductUseCase = makeCreateProductUseCase()

    const { product } = await createProductUseCase.execute({
      name,
      series_id,
    })

    return reply.status(201).send({
      product,
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
