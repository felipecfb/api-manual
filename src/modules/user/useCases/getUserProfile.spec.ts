import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { GetUserProfileUseCase } from './getUserProfile'

import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsersRepository'
import { UserNotExistsError } from '../errors/user-not-exists'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Vincent Allen',
      email: 'zomimo@ofkifos.lu',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Vincent Allen')
  })

  it('should not be able to get user profile wit wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
