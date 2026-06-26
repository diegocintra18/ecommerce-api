import ProductRepository from '../repositories/ProductRepository.js'
import type Product from '#models/Product'

export class ProductService {
  private productRepository: ProductRepository = new ProductRepository()

  public async createProduct(product: any): Promise<Product> {
    return this.productRepository.createProduct(product)
  }
}
