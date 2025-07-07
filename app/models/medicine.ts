import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type {ManyToMany} from '@adonisjs/lucid/types/relations'
import Patient from './patient.js'
export default class Medicine extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare medicineName: string

  @column()
  declare cost: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @manyToMany(()=>Patient,{
    pivotTable:'pivot_patient_medicine'
  })
  declare patientId: ManyToMany<typeof Patient>
}