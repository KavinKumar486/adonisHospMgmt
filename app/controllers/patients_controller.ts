import { HttpContext } from '@adonisjs/core/http'
import { patientValidator, patientPatchValidator,patientPutValidator } from '#validators/patient'
import PatientRepository from '../repository/patientRepository.js'

export default class PatientsController {
  repo = new PatientRepository()

  async getPatient({ request, response }: HttpContext) {
    try{const id = request.input('id')
    const res = await this.repo.get(id)
    response.status(200).send({success:true,message:'Fetched successfully',data:res})}
    catch(err){
      throw err
    }
  } 

  async add({ request, response }: HttpContext) {
    try{let patientObject = request.body() as Array<{ patientName: string; diagnosis: string; doctorId: number}>
    if (!Array.isArray(patientObject)) {
      patientObject = [patientObject]
    }
    let patientArrayInput: Array<{ patientName: string; diagnosis: string; doctorId: number }> = []
    for (let i = 0; i < patientObject.length; i++) {
      await patientValidator.validate({
        patientName: patientObject[i].patientName,
        diagnosis: patientObject[i].diagnosis,
        doctorId: patientObject[i].doctorId
      })
      patientArrayInput.push({
        patientName: patientObject[i].patientName, 
        diagnosis: patientObject[i].diagnosis,
        doctorId: patientObject[i].doctorId
      })
    }
    await this.repo.addManyPatients(patientArrayInput)
    response.status(201).send({success:true,message:'Created Successfully'})}
    catch(err){
      throw err
    }
  }

  async update({ request, response }: HttpContext) {
    const id = request.params().id
    const payload = await patientPutValidator.validate(request.body())
    await this.repo.updatePatient(id, payload)
    response.status(204).send({success:true,message:'Updated Successfully',data:payload})
  }

  async delete({ request, response }: HttpContext) {
   try{ const id = request.params().id
    await this.repo.deletePatient(id)
    response.status(204).send({success:true,message:'Deleted Successfully'})
 }catch(err){
      throw err
    }
  }
  
  async patchPatient({request,response}:HttpContext){
    try {const id = request.params().id;
    const payload=  await patientPatchValidator.validate(request.body());
    await this.repo.patchPatient(id,payload);
    response.status(204).send({success:true,message:'patched Successfully'})

    }
    catch(err){
      throw err
    }
  }
}
