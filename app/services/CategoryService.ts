import CategoryRepository from '../repositories/CategoryRepository.ts'
import type { CategoryFilters } from '#validators/CategoryValidator'

export class CategoryService {
  private categoryRepository: CategoryRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  public async createCategory(payload: any) {
    return await this.categoryRepository.createCategory(payload)
  }

  public async getList(filters: CategoryFilters) {
    return this.categoryRepository.getList(filters)
  }
}
