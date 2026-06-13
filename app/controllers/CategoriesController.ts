import type { HttpContext } from '@adonisjs/core/http'
import { CreateCategoryValidator } from '#validators/CategoryValidator'
import { CategoryService } from '#services/CategoryService'
export default class CategoriesController {
  categoryService: CategoryService

  constructor() {
    this.categoryService = new CategoryService()
  }

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(CreateCategoryValidator)

    if (!payload) {
      return response.status(400).json({ error: 'Invalid category data' })
    }

    const category = await this.categoryService.createCategory(payload)

    if (category) {
      return response.status(201).json(category)
    }

    return response.status(500).json({ error: 'Failed to create category' })
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