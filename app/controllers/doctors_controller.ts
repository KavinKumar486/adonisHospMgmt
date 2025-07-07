import { HttpContext } from '@adonisjs/core/http'
import doctorDb from '../repository/doctorRepository.js'
import { doctorInsertValidator, doctorPutValidator, doctorPatchValidator } from '#validators/doctor';

export default class DoctorsController {
    doc =new doctorDb()
    async getDoctor({request,response}:HttpContext){
            const id = request.input('id');
            const res = await this.doc.get(id);
            response.send(res)
    }
    async add({ request, response }: HttpContext) {
        let doctorObject = request.body() as Array<{ name: string; expertise: string }>
    
        if (!Array.isArray(doctorObject)) {
            doctorObject = [doctorObject]
        }
        let doctorArray: Array<{ name: string; expertise: string }> = []
        for (let i = 0; i < doctorObject.length; i++) {
            await doctorInsertValidator.validate({
                name: doctorObject[i].name,
                expertise: doctorObject[i].expertise
            })
            doctorArray.push({
                name: doctorObject[i].name,
                expertise: doctorObject[i].expertise
            })
        }
        await this.doc.addManyDoctors(doctorArray)
        response.send('Created Successfully')
    }
    async updateAll({request,response}:HttpContext){
        try{
            const id = request.params().id;
            const payload= await doctorPutValidator.validate(request.body());
            const {name,expertise} = payload;
            await this.doc.updateDoctor(name,expertise,id);
            response.send('Updated Successfully')
        }catch(err){
            response.send(err.message)
        }
    }

    async update({request,response}:HttpContext){
        const id= request.params().id;
        const payload = doctorPatchValidator.validate(request.body)
        await this.doc.patchDoctor(payload,id);
        response.send(payload)
    }

    async delete({request,response}:HttpContext){
        try
        {
            const id = request.params().id
            await this.doc.deleteDoctor(id)
            response.send('Deletion success')
        }
        catch(err)
        {
            throw err
        }
    }
    deleteMany(){}
    updateMany(){}

}