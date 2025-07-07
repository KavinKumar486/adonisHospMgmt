import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'patients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('patient_name').notNullable() // changed from name ➜ patient_name
      table.string('diagnosis').notNullable()
      table.integer('doctor_id').unsigned().notNullable().references('doctors.id').onDelete('CASCADE') // typo fixed: docterId ➜ doctor_id
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
