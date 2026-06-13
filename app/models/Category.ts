import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import slugify from 'slugify'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

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
    }
  }
}
