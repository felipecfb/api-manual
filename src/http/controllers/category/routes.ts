import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifiyJwt'

import { createCategory } from './createCategory'
import { fetchCategories } from './fetchCategories'

export async function categoryRoutes(app: FastifyInstance) {
  app.get('/categories', fetchCategories)
  app.post('/categories', { onRequest: verifyJWT }, createCategory)
}
