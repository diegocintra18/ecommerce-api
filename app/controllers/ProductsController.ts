import type { HttpContext } from '@adonisjs/core/http'
import { CreateProductValidator } from '#validators/ProductValidator'
import { ProductService } from '#services/ProductService'

export default class ProductsController {
  private productService: ProductService

  public constructor() {
    this.productService = new ProductService()
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(CreateProductValidator)

    const data = await this.productService.createProduct(payload)

    return response.ok(data)
  }
}
