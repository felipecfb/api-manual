import { authenticateUser } from '@/modules/user/controllers/authenticateUser'
import { createUser } from '@/modules/user/controllers/createUser'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/sessions', authenticateUser)
}
