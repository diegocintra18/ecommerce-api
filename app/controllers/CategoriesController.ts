import type { HttpContext } from '@adonisjs/core/http'
import { CreateCategoryValidator, CategoryFiltersValidator, UpdateCategoryValidator } from '#validators/CategoryValidator'
import { CategoryService } from '#services/CategoryService'
import cache from '@adonisjs/cache/services/main'

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
   */
  async index({ request, response }: HttpContext) {
    try {
      const filters = await request.validateUsing(CategoryFiltersValidator)

      const categories = await cache.getOrSet({
        key: 'categories:page${page}',
        ttl: '10m',
        factory: () => this.categoryService.geCategoriestList(filters)
      })

      return response.ok(categories)
    } catch (error) {
      return response.internalServerError({ error: error })
    }
  }

  /**
   * @store
   * @operationId createCategory
   * @description Cria uma categoria
   * @requestBody <CreateCategoryValidator>
   * @responseBody 200 - <Category[]>.with(relations) - Retorna a categoria criada
   * @paramUse(sortable, filterable)
   * @responseHeader 200 - @use(paginated)
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(CreateCategoryValidator)

      if (!payload) return response.badRequest({ error: 'Invalid category data' })

      const category = await this.categoryService.createCategory(payload)

      if (category) return response.created({ data: category })

      return response.internalServerError({ error: 'Failed to create category' })
    } catch (error) {
      return response.internalServerError({ error: error })
    }
  }

  /**
   * Show individual record
   */
  async show({}: HttpContext) {}

  /**
   * @update
   * @operationId updateCategory
   * @description Atualiza uma categoria
   * @requestBody <UpdateCategoryValidator>
   * @responseBody 200 - <Category[]>.with(relations) - Retorna a categoria atualizada
   * @paramUse(sortable, filterable)
   * @responseHeader 200 - @use(paginated)
   */
  async update({ request, response }: HttpContext) {
    try{
      const payload = await request.validateUsing(UpdateCategoryValidator)
      const id = Number.parseInt(request.param('id'), 10) ?? 0

      if (!payload || !id ) return response.badRequest({ error: 'Invalid category data' })

      const category = await this.categoryService.updateCategory(payload, id)

      if(category) return response.ok({ data: category })

      return response.internalServerError({ error: 'Failed to update category' })
    } catch (error) {
      return response.internalServerError({ error: error })
    }
  }

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}
}
