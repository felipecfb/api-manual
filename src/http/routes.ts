import { FastifyInstance } from 'fastify'

import { createUser } from './controllers/user/createUser'
import { authenticateUser } from './controllers/user/authenticateUser'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/sessions', authenticateUser)
}
