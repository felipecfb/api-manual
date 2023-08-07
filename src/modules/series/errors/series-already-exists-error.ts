export class SeriesAlreadyExistsError extends Error {
  constructor() {
    super('Series already exists.')
  }
}
