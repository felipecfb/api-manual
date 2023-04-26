import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import jwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
