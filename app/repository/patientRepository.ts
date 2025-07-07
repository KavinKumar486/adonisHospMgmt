// import { HttpContext } from '@adonisjs/http-server'
import Patient from '../models/patient.js'

export default class PatientRepository {
  async get(id?: number) {
    if (id) {
      return await Patient.find(id)
    }
    return await Patient.all()
  }

  async addManyPatients(patientArray: Array<any>) {
    return await Patient.createMany(patientArray)
  }

  async updatePatient(id: number, payload: any) {
    const patient = await Patient.findOrFail(id)
    patient.merge(payload)
    await patient.save()
    return patient
  }

  async deletePatient(id: number) {
    const patient = await Patient.findOrFail(id)
    await patient.delete()
    return true
  }
  async patchPatient(id:number,payload:object){
    try{
        const patient = await Patient.findOrFail(id);
        await patient.merge(payload)
        return patient.save();
    }
    catch(err){
        throw err;
    }
  }
}