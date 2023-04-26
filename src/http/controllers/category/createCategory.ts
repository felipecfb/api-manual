import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateCategoryUseCase } from '@/modules/category/factories/makeCreateCategoryUseCase'
import { CategoryAlreadyExistsError } from '@/modules/category/errors/category-already-exists-error'

export async function createCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCategoryBodySchema = z.object({
    name: z.string(),
  })

  const { name } = createCategoryBodySchema.parse(request.body)

  try {
    const createCategoryUseCase = makeCreateCategoryUseCase()

    const { category } = await createCategoryUseCase.execute({
      name,
    })

    return reply.status(200).send({
      category,
    })
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
