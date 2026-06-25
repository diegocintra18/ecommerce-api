import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('slug').unique()
      table.string('sku').unique()
      table.float('price')
      table.float('sales_price')
      table.integer('quantity')
      table.tinyint('status')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
