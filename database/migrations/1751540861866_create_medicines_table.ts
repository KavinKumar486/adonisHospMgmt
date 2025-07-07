import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'medicines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('medicineName').notNullable()
      table.integer('cost').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}