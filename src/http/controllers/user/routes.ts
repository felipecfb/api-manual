import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifiyJwt'

import { createUser } from './createUser'
import { authenticateUser } from './authenticateUser'
import { getUserProfile } from './getUserProfile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/sessions', authenticateUser)

  app.get('/me', { onRequest: verifyJWT }, getUserProfile)
}
