import { Prisma, Category } from '@prisma/client'

export interface ICategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  findById(id: string): Promise<Category | null>
  findBySlug(slug: string): Promise<Category | null>
  fetchCategories(page: number): Promise<Category[]>
}
