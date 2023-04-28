import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifiyJwt'

import { createProducts } from './createProduct'
import { fetchProductsBySeries } from './fetchProductsBySeries'

export async function productRoutes(app: FastifyInstance) {
  app.post('/products', { onRequest: [verifyJWT] }, createProducts)
  app.get('/products/:series_id', fetchProductsBySeries)
}
