import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Patient from './patient.js'

import { beforeSave } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'

export default class Doctor extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare expertise: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Patient)
  declare patients: HasMany<typeof Patient>

  @beforeSave()
  static async hashDoctorPassword<T extends typeof Doctor>(this: T, doctor: InstanceType<T>) {
    if (doctor.$dirty.password) {
      doctor.password = await hash.use('scrypt').make(doctor.password)
      console.log('Hashed password during save:', doctor.password)
    }
  }

  // Manual verifyCredentials (uses proper hash verification)
  public static async verifyCredentials(name: string, pass: string): Promise<Doctor> {
    const doctor = await this.query().where('name', name).first()
    if (!doctor) {
      throw new Error('Invalid credentials: Doctor not found')
    }

    const isValid = await hash.verify(doctor.password, pass)
    if (!isValid) {
      throw new Error('Invalid credentials: Password mismatch')
    }

    return doctor
  }
}
