import { BaseSchema } from '@adonisjs/lucid/schema'
import { scheduler } from 'timers/promises'

export default class extends BaseSchema {
  protected tableName = 'doctors'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('password')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}