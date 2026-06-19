import Database from '@adonisjs/lucid/services/db'
import type CategoryRepositoryInterface from '../interfaces/CategoryRepositoryInterface.ts'
import type { CategoryFilters } from '#validators/CategoryValidator'
import Category from '#models/Category'
import { CategoryStatus } from '../enums/categoryEnum.ts'

export default class CategoryRepository implements CategoryRepositoryInterface {
  public async createCategory(payload: any): Promise<Category> {
    const trx = await Database.transaction()

    try {
      if (payload.parent_id != null) {
        const parentCategory = await Category.find(payload.parent_id)

        if (!parentCategory) {
          throw new Error('Parent category not found')
        }
      }

      const category = await Category.create(payload, { client: trx })
      await trx.commit()
      
      return category
    } catch (error) {
      console.log(error)
      await trx.rollback()
      throw error
    }
  }

  public async geCategoriestList(filters: CategoryFilters) {
    const page = filters.page ?? 1
    const limit = filters.limit ?? 10
    const query = Category.query()

    if (filters.search) {
      query.where('name', 'like', `%${filters.search}%`)
    }

    query.where('status', filters.status ?? CategoryStatus.ACTIVE)

    if (filters.sort) {
      query.orderBy(filters.sort)
    }

    query.whereNull('parent_id')
    query.preload('subCategories')

    return query.paginate(page, limit)
  }

  public async updateCategory(payload: any, category_id: number): Promise<Category | null> {
    const trx = await Database.transaction()

    try {
      const category = await Category.find(category_id, { client: trx })

      category?.useTransaction(trx)
      category?.merge(payload)

      await category?.save()
      await trx.commit()
      
      return category
    } catch (error) {
      console.log(error)
      await trx.rollback()
      throw error
    }
  }
}
