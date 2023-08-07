import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetCategoryUseCase } from '@/modules/category/factories/makeGetCategoryUseCase'
import { CategoryNotExistsError } from '@/modules/series/errors/category-not-exists-error'

export async function getCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCategoryParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getCategoryParamsSchema.parse(request.params)

  try {
    const getCategoryUseCase = makeGetCategoryUseCase()

    const category = await getCategoryUseCase.execute({
      id,
    })

    return reply.status(200).send(category)
  } catch (err) {
    if (err instanceof CategoryNotExistsError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
