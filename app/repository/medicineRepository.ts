import Medicine from '#models/medicine'

export default class MedicineRepository {
  async get(id?: number) {
    if (id) {
      return await Medicine.find(id)
    }
    return await Medicine.all()
  }

  async addMany(medicineArray: Array<any>) {
    return await Medicine.createMany(medicineArray)
  }

  async updateMedicine(id: number, payload: any) {
    const medicine = await Medicine.findOrFail(id)
    medicine.merge(payload)
    await medicine.save()
    return medicine
  }

  async patchMedicine(id: number, payload: Partial<any>) {
    const medicine = await Medicine.findOrFail(id)
    medicine.merge(payload)
    await medicine.save()
    return medicine
  }

  async deleteMedicine(id: number) {
    const medicine = await Medicine.findOrFail(id)
    await medicine.delete()
    return true
  }
}
