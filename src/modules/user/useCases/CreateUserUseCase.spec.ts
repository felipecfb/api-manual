import { beforeEach, describe, expect, it } from 'vitest'

import { CreateUserUseCase } from './CreateUserUseCase'
import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory'

let usersRepository: UsersRepositoryInMemory
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id', user.id)
    expect(user).toHaveProperty('email', user.email)
  })
})
