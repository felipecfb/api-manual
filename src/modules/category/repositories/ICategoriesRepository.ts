import { Prisma, Category } from '@prisma/client'

export interface ICategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  findById(id: string): Promise<Category | null>
}
