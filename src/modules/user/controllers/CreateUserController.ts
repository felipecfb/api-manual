import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUserUseCase } from '../factories/makeCreateUserUseCase'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    try {
      const createUserUseCase = makeCreateUserUseCase()

      await createUserUseCase.execute({
        name,
        email,
        password,
      })
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({
          message: err.message,
        })
      }

      return reply.status(500).send()
    }

    return reply.status(201).send()
  }
}

export { CreateUserController }
