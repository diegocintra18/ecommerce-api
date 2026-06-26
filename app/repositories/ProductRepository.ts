import type ProductRepositoryInterface from '../interfaces/ProductRepositoryInterface.js'
import Product from '#models/Product'
import Database from '@adonisjs/lucid/services/db'

export default class ProductRepository implements ProductRepositoryInterface {
  public async createProduct(payload: any): Promise<Product> {
    const trx = await Database.transaction()

    try {
      const product = await Product.create(payload, { client: trx })
      await trx.commit()

      return product
    } catch (error) {
      console.log(error)
      await trx.rollback()
      throw error
    }
  }
}
