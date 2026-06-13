import CategoryRepository from '../repositories/CategoryRepository.ts'

export class CategoryService {
  private categoryRepository: CategoryRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  public async createCategory(payload: any) {
    try {
      const category = await this.categoryRepository.createCategory(payload)
      return category
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  }
}
