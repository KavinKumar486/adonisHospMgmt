import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Doctor from './doctor.js'
import Medicine from './medicine.js'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'patient_name' })
  declare patientName: string

  @column()
  declare diagnosis: string

  @column({ columnName: 'doctor_id' })
  declare doctorId: number

  @belongsTo(() => Doctor)
  declare doctor: BelongsTo<typeof Doctor>

  @manyToMany(() => Medicine, {
    pivotTable: 'pivot_patient_medicine', 
  })
  declare medicines: ManyToMany<typeof Medicine>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
