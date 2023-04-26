import { Prisma, Category } from '@prisma/client'
import { ICategoriesRepository } from '../ICategoriesRepository'
import { randomUUID } from 'crypto'

class InMemoryCategoriesRepository implements ICategoriesRepository {
  public categories: Category[] = []

  async fetchCategories(page: number): Promise<Category[]> {
    const categories = this.categories.splice((page - 1) * 20, page * 20)

    return categories
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.slug === slug)

    if (!category) {
      return null
    }

    return category
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id)

    if (!category) {
      return null
    }

    return category
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = {
      id: randomUUID(),
      name: data.name,
      slug: data.name.toLowerCase().replace(' ', '-'),
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.categories.push(category)

    return category
  }
}

export { InMemoryCategoriesRepository }
