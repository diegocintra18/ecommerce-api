import Category from '#models/Category'
import type { CategoryFilters } from '#validators/CategoryValidator'

export default interface CategoryRepositoryInterface {
  createCategory(payload: any): Promise<Category>
  getList(filters: CategoryFilters): Promise<any>
}
