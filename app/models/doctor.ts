import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type {HasMany} from '@adonisjs/lucid/types/relations'
import Patient from './patient.js'
export default class Doctor extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare expertise:string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @hasMany(()=>Patient)
  declare patients: HasMany<typeof Patient>
}
