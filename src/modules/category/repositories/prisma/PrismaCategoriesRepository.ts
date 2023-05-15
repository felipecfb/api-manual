import { Category, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ICategoriesRepository } from '../ICategoriesRepository'

class PrismaCategoriesRepository implements ICategoriesRepository {
  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = prisma.category.create({
      data,
    })

    return category
  }

  async findById(id: string): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        id,
      },
    })

    return category
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        slug,
      },
    })

    return category
  }

  async fetchCategories(query?: string): Promise<Category[]> {
    const categories = prisma.category.findMany({
      where: {
        name: {
          contains: query?.toLowerCase(),
        },
      },
    })

    return categories
  }
}

export { PrismaCategoriesRepository }
