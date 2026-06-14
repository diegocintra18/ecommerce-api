import type { HttpContext } from '@adonisjs/core/http'
import { CreateCategoryValidator, CategoryFiltersValidator } from '#validators/CategoryValidator'
import { CategoryService } from '#services/CategoryService'
import { ApiResponse } from '../Utils/ApiResponse.js'

export default class CategoriesController {
  categoryService: CategoryService

  constructor() {
    this.categoryService = new CategoryService()
  }

  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    try {
      const filters = await request.validateUsing(CategoryFiltersValidator)
      const categories = await this.categoryService.getList(filters)

      return ApiResponse.success(response, categories)
    } catch (error) {
      return ApiResponse.internalError(response)
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(CreateCategoryValidator)

      if (!payload) {
        return ApiResponse.badRequest(response, 'Invalid category data')
      }

      const category = await this.categoryService.createCategory(payload)

      if (category) {
        return ApiResponse.created(response, category)
      }

      return ApiResponse.internalError(response, 'Failed to create category')
    } catch (error) {
      return ApiResponse.internalError(response)
    }
  }

  /**
   * Show individual record
   */
  async show({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}
}