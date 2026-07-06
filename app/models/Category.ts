import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import slugify from 'slugify'
import * as relations from '@adonisjs/lucid/types/relations'
import Product from '#models/Product'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare status: number

  @column()
  declare parent_id?: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Category, {
    foreignKey: 'parent_id',
    localKey: 'id',
  })
  public subCategories: any

  @manyToMany(() => Product, {
    pivotTable: 'product_categories',
  })
  declare products: relations.ManyToMany<typeof Product>

  @beforeSave()
  static async generateSlug(category: Category) {
    if (category.$dirty.name) {
      let slug = slugify(category.name, {
        lower: true,
        strict: true,
      })

      const existing = await this.findBy('slug', slug)

      if (existing) {
        slug = `${slug}-${Date.now()}`
      }

      category.slug = slug
      category.status = 1
    }
  }
}
