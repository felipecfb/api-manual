import { FastifyInstance } from 'fastify'

import { createUser } from './controllers/user/createUser'
import { authenticateUser } from './controllers/user/authenticateUser'
import { createCategory } from './controllers/category/createCategory'
import { fetchCategories } from './controllers/category/fetchCategories'
import { createSeries } from './controllers/series/createSeries'
import { createProducts } from './controllers/products/createProduct'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/sessions', authenticateUser)

  app.post('/categories', createCategory)
  app.get('/categories', fetchCategories)

  app.post('/series', createSeries)

  app.post('/products', createProducts)
}
