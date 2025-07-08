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
    let patientObject = request.body()
    const patientArrayInput = Array.isArray(patientObject) ? patientObject : [patientObject]
    const patientArray = []
    for (const obj of patientArrayInput) {
      const payload = await patientValidator.validate(obj)
      patientArray.push(payload)
    }
    await this.repo.addManyPatients(patientArray)
    response.status(201).send({success:true,message:'Created Successfully'})
  }

  async update({ request, response }: HttpContext) {
    const id = request.params().id
    const payload = await patientPutValidator.validate(request.body())
    await this.repo.updatePatient(id, payload)
    response.status(204).send({success:true,message:'Updated Successfully',data:payload})
  }

  async delete({ request, response }: HttpContext) {
    const id = request.params().id
    await this.repo.deletePatient(id)
    response.status(204).send({success:true,message:'Deleted Successfully'})
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
