import CategoryRepository from '../repositories/CategoryRepository.ts'
import type { CategoryFilters } from '#validators/CategoryValidator'
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/categoryDto.ts'

export class CategoryService {
  private categoryRepository: CategoryRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  public async createCategory(payload: CreateCategoryDTO) {
    return await this.categoryRepository.createCategory(payload)
  }

  public async geCategoriestList(filters: CategoryFilters) {
    return this.categoryRepository.geCategoriestList(filters)
  }

  public async updateCategory(payload: UpdateCategoryDTO, category_id: number) {
    return this.categoryRepository.updateCategory(payload, category_id)
  }
}
