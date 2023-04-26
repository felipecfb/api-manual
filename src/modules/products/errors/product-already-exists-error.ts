export class ProductAlreadyExists extends Error {
  constructor() {
    super('Product already exists.')
  }
}
