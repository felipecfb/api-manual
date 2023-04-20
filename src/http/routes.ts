import { CreateUserController } from '@/modules/user/controllers/CreateUserController'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  const createUserController = new CreateUserController()

  app.post('/users', createUserController.handle)
}
