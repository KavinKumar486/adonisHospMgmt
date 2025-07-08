import { HttpContext } from '@adonisjs/core/http'
import { medicineValidator, medicinePatchValidator, medicinePutValidator } from '#validators/medicine'
import MedicineRepository from '../repository/medicineRepository.js'

export default class MedicinesController {
  repo = new MedicineRepository()

  async getMedicine({ request, response }: HttpContext) {
    try {
      const id = request.input('id')
      const res = await this.repo.get(id)
      response.status(200).send({ success: true, message: 'Fetched successfully', data: res })
    } catch (err) {
      throw err
    }
  }

  async add({ request, response }: HttpContext) {
    const medicineObject = request.body()
    const medicineArrayInput = Array.isArray(medicineObject) ? medicineObject : [medicineObject]
    const medicineArray = []

    for (const obj of medicineArrayInput) {
      const payload = await medicineValidator.validate(obj)
      medicineArray.push(payload)
    }

    await this.repo.addMany(medicineArray)
    response.status(201).send({ success: true, message: 'Created Successfully' })
  }

  async update({ request, response }: HttpContext) {
    const id = request.params().id
    const payload = await medicinePutValidator.validate(request.body())
    await this.repo.updateMedicine(id, payload)
    response.status(204).send({ success: true, message: 'Updated Successfully', data: payload })
  }

  async patchMedicine({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      const payload = await medicinePatchValidator.validate(request.body())
      await this.repo.patchMedicine(id, payload)
      response.status(204).send({ success: true, message: 'Patched Successfully' })
    } catch (err) {
      throw err
    }
  }

  async delete({ request, response }: HttpContext) {
    const id = request.params().id
    await this.repo.deleteMedicine(id)
    response.status(204).send({ success: true, message: 'Deleted Successfully' })
  }
}
