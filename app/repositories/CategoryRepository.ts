import Database from '@adonisjs/lucid/services/db'
import type CategoryRepositoryInterface from '../interfaces/CategoryRepositoryInterface.ts'
import type { CategoryFilters } from '#validators/CategoryValidator'
import Category from '#models/Category'

export default class CategoryRepository implements CategoryRepositoryInterface {
  public async createCategory(payload: any): Promise<Category> {
    const trx = await Database.transaction()

    try {
      const category = await Category.create(payload, { client: trx })
      await trx.commit()
      return category
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  public async getList(filters: CategoryFilters) {
    const page = filters.page ?? 1
    const limit = filters.limit ?? 10
    const query = Category.query()

    if (filters.search) {
      query.where('name', 'like', `%${filters.search}%`)
    }

    if (filters.status) {
      query.where('status', filters.status)
    }

    if (filters.sort) {
      query.orderBy(filters.sort)
    }

    return query.paginate(page, limit)
  }
}
