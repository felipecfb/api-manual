import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifiyJwt'

import { createProducts } from './createProduct'
import { fetchProductsBySeries } from './fetchProductsBySeries'
import { fetchProducts } from './fetchProducts'

export async function productRoutes(app: FastifyInstance) {
  app.post('/products', { onRequest: [verifyJWT] }, createProducts)
  app.get('/products/:series_id', fetchProductsBySeries)
  app.get('/products', fetchProducts)
}
