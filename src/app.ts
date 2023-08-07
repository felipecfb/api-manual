import fastify from 'fastify'
import { ZodError } from 'zod'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

import { env } from './env'

import { categoryRoutes } from './http/controllers/category/routes'
import { productRoutes } from './http/controllers/products/routes'
import { seriesRoutes } from './http/controllers/series/routes'
import { userRoutes } from './http/controllers/user/routes'

export const app = fastify()

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(cors, {
  origin: '*',
})

app.register(userRoutes)
app.register(categoryRoutes)
app.register(productRoutes)
app.register(seriesRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
