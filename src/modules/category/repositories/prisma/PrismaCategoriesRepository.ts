import { Category, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ICategoriesRepository } from '../ICategoriesRepository'

class PrismaCategoriesRepository implements ICategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = prisma.category.create({
      data,
    })

    return category
  }

  findById(id: string): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        id,
      },
    })

    return category
  }

  findBySlug(slug: string): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        slug,
      },
    })

    return category
  }

  fetchCategories(page: number): Promise<Category[]> {
    const categories = prisma.category.findMany({
      skip: (page - 1) * 20,
    })

    return categories
  }

  searchManyCategories(query: string, page: number): Promise<Category[]> {
    const categories = prisma.category.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return categories
  }
}

export { PrismaCategoriesRepository }
