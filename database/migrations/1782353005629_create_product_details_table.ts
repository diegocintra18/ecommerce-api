import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'product_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.foreign('product_id', 'products.id')
      table.text('description')
      table.string('seo_title')
      table.string('seo_description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
