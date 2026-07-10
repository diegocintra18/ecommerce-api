import type { HttpContext } from '@adonisjs/core/http'
import { CreateProductValidator, ProductFiltersValidator } from '#validators/ProductValidator'
import { ProductService } from '#services/ProductService'

export default class ProductsController {
  private productService: ProductService

  public constructor() {
    this.productService = new ProductService()
  }

  public async index({ request, response }: HttpContext) {
    const filters = await request.validateUsing(ProductFiltersValidator)
    const data = await this.productService.getProducts(filters)

    return response.ok(data)
  }

  /**
   * @store
   * @operationId createProduct
   * @description Cria um produto
   * @requestBody <CreateProductValidator>
   * @responseBody 200 - <Product[]>.with(relations) - Retorna o produto criado
   * @responseHeader 200
   */
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(CreateProductValidator)

    const data = await this.productService.createProduct(payload)

    return response.ok(data)
  }
}
