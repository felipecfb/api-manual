import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifiyJwt'
import { createSeries } from './createSeries'
import { fetchSeries } from './fetchSeries'

export async function seriesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/series', createSeries)
  app.get('/series', fetchSeries)
}
