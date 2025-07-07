import { HttpContext } from '@adonisjs/core/http'
import { patientValidator, patientPatchValidator,patientPutValidator } from '#validators/patient'
import PatientRepository from '../repository/patientRepository.js'

export default class PatientsController {
  repo = new PatientRepository()

  async getPatient({ request, response }: HttpContext) {
    const id = request.input('id')
    const res = await this.repo.get(id)
    response.send(res)
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
    response.send('Created Successfully')
  }

  async update({ request, response }: HttpContext) {
    const id = request.params().id
    const payload = await patientPutValidator.validate(request.body())
    await this.repo.updatePatient(id, payload)
    response.send('Updated Successfully')
  }

  async delete({ request, response }: HttpContext) {
    const id = request.params().id
    await this.repo.deletePatient(id)
    response.send('Deleted Successfully')
  }
  async patchPatient({request,response}:HttpContext){
    const id = request.params().id;
    const payload=  await patientPatchValidator.validate(request.body());
    await this.repo.patchPatient(id,payload);
    response.send("patch success");
  }
}
