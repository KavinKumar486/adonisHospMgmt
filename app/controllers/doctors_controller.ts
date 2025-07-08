import { HttpContext } from '@adonisjs/core/http'
import doctorDb from '../repository/doctorRepository.js'
import { doctorInsertValidator, doctorPutValidator, doctorPatchValidator,docterGetIdValidator, docterIdValidator, doctorIdsValidator } from '#validators/doctor';


export default class DoctorsController {
    doc =new doctorDb()
    async getDoctor({request,response}:HttpContext){
        try
            {
            const { id } =await  docterGetIdValidator.validate(request.qs())
            const res = await this.doc.get(id);
            response.ok({success:true,message:'Fetched successfully',data:res})}
        catch(err){
            throw err
        }
    }
    async add({ request, response }: HttpContext) {
        try
        {
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
            response.status(201).send({success:true,message:'Created Successfully'})
        }
        catch(err){
            throw err
        }
    }
    async updateAll({request,response}:HttpContext){
        try{
            const { id } =await  docterIdValidator.validate(request.qs());
            const payload= await doctorPutValidator.validate(request.body());
            const {name,expertise} = payload;
            await this.doc.updateDoctor(name,expertise,id);
            response.status(204).send({success:true,message:'Updated Successfully'})
        }catch(err){
            throw err
        }
    }

    async update({request,response}:HttpContext){
        try{
            const { id } =await  docterIdValidator.validate(request.qs());
            const payload = doctorPatchValidator.validate(request.body)
            await this.doc.patchDoctor(payload,id);
            response.status(204).send({success:true,message:'Updated Successfully'})
        }
        catch(err){
            throw err
        }
    }

    async delete({request,response}:HttpContext){
        try
        {
            const { id } =await  docterIdValidator.validate(request.qs());
            await this.doc.deleteDoctor(id);
            response.status(204).send({success:true,message:'Deletion success'});
        }
        catch(err)
        {
            response.internalServerError(err)
        }
    }
    async deleteMany({request,response}:HttpContext){
        
        const ids= await doctorIdsValidator.validate(request.qs());
        await this.doc.deleteMany(ids.ids);
        return response.ok({success:true, message: 'Doctors deleted successfully', deletedIds: ids })
        }

    async getPatientCount({ request, response }: HttpContext) {
      
        const {id} = await docterGetIdValidator.validate(request.qs());
        const payload = await this.doc.getPatientCnt(id);
        response.status(200).send({success:true,message:'fetch success',data:payload});
    }
    async getPatientDetailsWithDoctor({request,response}:HttpContext){
        const{id}=await docterGetIdValidator.validate(request.qs());
        const payload = await this.doc.getDoctorWithPatients(id);
        response.status(200).send({success:true,message:'fetch success',data:payload});
    }
    updateMany(){}
}