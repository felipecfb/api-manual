import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifiyJwt'

import { createProducts } from './createProduct'

export async function productRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/products', createProducts)
}
