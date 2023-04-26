import { FastifyInstance } from 'fastify'

import { createUser } from './controllers/user/createUser'
import { authenticateUser } from './controllers/user/authenticateUser'
import { createCategory } from './controllers/category/createCategory'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/sessions', authenticateUser)

  app.post('/categories', createCategory)
}
