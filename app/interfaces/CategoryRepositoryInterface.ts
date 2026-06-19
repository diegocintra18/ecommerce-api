import Category from '#models/Category'
import type { CategoryFilters } from '#validators/CategoryValidator'

export default interface CategoryRepositoryInterface {
  createCategory(payload: any): Promise<Category>
  geCategoriestList(filters: CategoryFilters): Promise<any>
  updateCategory(payload: any, category_id: number): Promise<Category | null>
}
