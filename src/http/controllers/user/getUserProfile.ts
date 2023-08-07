import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/modules/user/factories/makeGetUserProfileUseCase'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}
