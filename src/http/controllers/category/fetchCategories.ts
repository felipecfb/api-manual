import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CategoryAlreadyExistsError } from '@/modules/category/errors/category-already-exists-error'
import { makeFetchCategoriesUseCase } from '@/modules/category/factories/makeFetchCategoriesUseCase'

export async function fetchCategories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchCategoriesQuerySchema = z.object({
    page: z.coerce.string(),
  })

  const { page } = fetchCategoriesQuerySchema.parse(request.query)

  try {
    const fetchCategoriesUseCase = makeFetchCategoriesUseCase()

    const { categories } = await fetchCategoriesUseCase.execute({
      page: Number(page),
    })

    return reply.status(200).send({
      categories,
    })
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
