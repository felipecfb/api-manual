import { FastifyInstance } from 'fastify'

import { createUser } from './createUser'
import { authenticateUser } from './authenticateUser'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/sessions', authenticateUser)
}
