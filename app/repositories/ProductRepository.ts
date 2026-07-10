import type ProductRepositoryInterface from '../interfaces/ProductRepositoryInterface.js'
import Product from '#models/Product'
import Database from '@adonisjs/lucid/services/db'
import { ProductStatus } from '../enums/productEnum.js'
import {type ProductFilters} from "#validators/ProductValidator";

export default class ProductRepository implements ProductRepositoryInterface {
  public async getProducts(filters: ProductFilters): Promise<Product[]> {
    const page = filters.page ?? 1
    const limit = filters.limit ?? 10
    const query = Product.query()

    if (filters.search) {
      query.where('name', 'like', `%${filters.search}%`)
    }

    if (filters.category) {
      query.whereHas('categories', (query) => {
        query.where('category_id', filters.category)
      })
    }

    query.where('status', filters.status ?? ProductStatus.ACTIVE)

    if (filters.sort) {
      query.orderBy(filters.sort)
    }

    return query.paginate(page, limit)
  }

  public async createProduct(payload: any): Promise<Product> {
    const trx = await Database.transaction()

    try {
      const { categories, ...productData } = payload

      const product = await Product.create(productData, {
        client: trx,
      })

      await product.related('categories').attach(categories)
      await trx.commit()

      return product
    } catch (error) {
      console.log(error)
      await trx.rollback()
      throw error
    }
  }
}
