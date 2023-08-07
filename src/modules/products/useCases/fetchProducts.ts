import { Products } from '@prisma/client'
import { IProductsRepository } from '../repositories/IProductsRepository'

interface IFetchProductsUseCaseRequest {
  query?: string
}

class FetchProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute({
    query,
  }: IFetchProductsUseCaseRequest): Promise<Products | Products[]> {
    const products = await this.productsRepository.fetchProducts(query)

    return products
  }
}

export { FetchProductsUseCase }
