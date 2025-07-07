// import { HttpContext } from "@adonisjs/core/http";
import Doctor from '#models/doctor'

class docRepo{
   
    async get(id?:number){
        try
        {let payload;
        if(!id){
            payload = await Doctor.all();
        }else{
            payload = await Doctor.query().where('id',id);
        }
        if(payload.length > 0){
            return payload;
        }
        throw new Error('No Users Found')
        }
        catch(err){
            throw err
        }
    }
    async addDoctor(name: string,expertise:string){
        try{ 
            if(!name || !expertise){
                throw new Error('Pass all the required parameters')
            }
            console.log(name,expertise)
            const payload = await Doctor.create(
                {
                name:name,
                expertise:expertise
                }  
            )
            return payload
        }
        catch(err){
            throw err
        }
    }
    async updateDoctor(name:string,expertise:string,id: number){
        try{  
            const payload = await Doctor.query().where('id',id).update({name:name,expertise:expertise})         
            return payload

        }catch(err){
            throw err
        }
    }
    async addManyDoctors(doctorArray: Array<object>){
        try{
            const payload = await Doctor.createMany(doctorArray);
            return payload
        }catch(err){
            throw err
        }
    }
    async deleteDoctor(id: number){
        try{await Doctor.query().where('id',id).delete()
            return "Deletion Success"
        }
        catch(err){throw err}
    }
    async patchDoctor(payload:object,id:number){
        try{
            const doctor = await Doctor.findOrFail(id)
            await doctor.merge(payload).save()
        }catch(err){
            throw err
        }
    }
}
export default docRepo