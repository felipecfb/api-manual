import { makeFetchProductsUseCase } from '@/modules/products/factories/makeFetchProducts'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchProductsQuerySchema = z.object({
    query: z.string().optional(),
  })

  const { query } = fetchProductsQuerySchema.parse(request.query)

  try {
    const fetchProductsUseCase = makeFetchProductsUseCase()

    const response = await fetchProductsUseCase.execute({
      query,
    })

    return reply.status(200).send(response)
  } catch (err: any) {
    return reply.status(500).send({
      message: err.message,
    })
  }
}
