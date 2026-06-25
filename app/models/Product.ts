import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import slugify from 'slugify'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare sku: string

  @column()
  declare price: number

  @column()
  declare sales_price: number

  @column()
  declare quantity: number

  @column()
  declare status: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async generateSlug(product: Product) {
    if (product.$dirty.name) {
      let slug = slugify(product.name, {
        lower: true,
        strict: true,
      })

      const existing = await this.findBy('slug', slug)

      if (existing) {
        slug = `${slug}-${existing.sku}`
      }

      product.slug = slug
      product.status = 1
    }
  }
}

