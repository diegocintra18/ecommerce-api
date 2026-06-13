import Database from '@adonisjs/lucid/services/db'
import type CategoryRepositoryInterface from '../interfaces/CategoryRepositoryInterface.ts'
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
}
