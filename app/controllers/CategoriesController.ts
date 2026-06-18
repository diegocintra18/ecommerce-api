import type { HttpContext } from '@adonisjs/core/http'
import { CreateCategoryValidator, CategoryFiltersValidator } from '#validators/CategoryValidator'
import { CategoryService } from '#services/CategoryService'
// Usar respostas nativas do Adonis via `response`

export default class CategoriesController {
  categoryService: CategoryService

  constructor() {
    this.categoryService = new CategoryService()
  }

  /**
   * @index
   * @operationId getCategories
   * @description Retorna a lista de categorias e sub-categorias
   * @responseBody 200 - <Category[]>.with(relations) - Retorna a lista de categorias e sub-categorias
   * @paramUse(sortable, filterable)
   * @responseHeader 200 - @use(paginated)
   * @responseHeader 200 - X-pages - A description of the header - @example(test)
   */
  async index({ request, response }: HttpContext) {
    try {
      const filters = await request.validateUsing(CategoryFiltersValidator)
      const categories = await this.categoryService.getList(filters)

      return response.ok(categories)
    } catch (error) {
      return response.status(500).json({ error: error })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(CreateCategoryValidator)

      if (!payload) {
        return response.status(400).json({ error: 'Invalid category data' })
      }

      const category = await this.categoryService.createCategory(payload)

      if (category) {
        return response.status(201).json({ data: category })
      }

      return response.status(500).json({ error: 'Failed to create category' })
    } catch (error) {
      return response.status(500).json({ error: error })
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
