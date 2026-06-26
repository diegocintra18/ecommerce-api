import type Product from '#models/Product'

export default interface ProductRepositoryInterface {
  createProduct(payload: any): Promise<Product>
}
