import Category from '#models/Category'

export default interface CategoryRepositoryInterface {
  createCategory(payload: any): Promise<Category>
}
