import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'patient_medicines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('patientId').unsigned().notNullable().references('patients.id').onDelete('cascade')
      table.integer('medicineId').unsigned().notNullable().references('medicines.id').onDelete('cascade')
      table.string('medicine_name');
      table.timestamp('created_at');
      table.timestamp('updated_at');
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}