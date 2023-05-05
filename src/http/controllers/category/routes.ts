import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifiyJwt'

import { createCategory } from './createCategory'
import { fetchCategories } from './fetchCategories'
import { getCategory } from './getCategory'

export async function categoryRoutes(app: FastifyInstance) {
  app.get('/categories', fetchCategories)
  app.get('/categories/:id', getCategory)
  app.post('/categories', { onRequest: verifyJWT }, createCategory)
}
