import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import slugify from 'slugify'

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
