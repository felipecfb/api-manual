import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifiyJwt'
import { createSeries } from './createSeries'
import { fetchSeries } from './fetchSeries'
import { fetchSeriesBySlug } from './fetchSeriesBySlug'

export async function seriesRoutes(app: FastifyInstance) {
  app.post('/series', { onRequest: verifyJWT }, createSeries)
  app.get('/series', fetchSeries)
  app.get('/series/:slug', fetchSeriesBySlug)
}
