// import { HttpContext } from "@adonisjs/core/http";
import Doctor from '#models/doctor'
import hash from '@adonisjs/core/services/hash'

class docRepo{
   async get(id?: number) {
  try {
    const doctors = await Doctor.query()
      .if(id, (query) => {
        query.where('id', id!)
      })

    if (!doctors.length) {
      throw new Error('No Users Found')
    }
    return id ? doctors[0] : doctors
  } catch (err) {
    throw err
  }
}
    async addDoctor(name: string,expertise:string, password: string){
        try{ 
            if(!name || !expertise || !password){
                throw new Error('Pass all the required parameters')
            }
            
            const payload = await Doctor.create(
                {
                name:name,
                expertise:expertise,
                password:password
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
    async addManyDoctors(doctorArray: Array<{ name: string; expertise: string; password: string }>) {
    try {
        console.log("before hasing : ", doctorArray[-1].password)
        for (const doc of doctorArray) {
            doc.password = await hash.make(doc.password)
        }
        console.log("after hasing : ", doctorArray[-1].password)
        const payload = await Doctor.createMany(doctorArray)
        return payload
    } catch (err) {
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
    async deleteMany(ids:Array<number>){
            try{await Doctor.query().whereIn('id', ids).delete()}
            catch(err){throw err}
    }
    async getPatientCnt(id?:number){
        try{
        let doctors;
        if (id) {
             doctors = await Doctor.query()
              .where('id', id)
              .withCount('patients')
              .first();
      
            if (!doctors) {
                throw new Error('Doctor id not found');
            }
            doctors=[doctors]
        }
        else{ doctors = await Doctor.query().withCount('patients');}
        const payload=doctors.map((doc) => ({
            id: doc.id,
            name: doc.name,
            patientCount: doc.$extras.patients_count,
          }))
        return payload   
        }
        catch(err){
            throw err
        }
    }
    async getDoctorWithPatients(id?:number){
        let docWithPatients;
        if(id){
             docWithPatients = await  Doctor.query()
            .where('id',id)
            .preload('patients')
            if(!docWithPatients){
                throw new Error('Doctor id not found');
            };
        }else{
            docWithPatients= Doctor.query().preload('patients');  
        }
        return docWithPatients
    }

}
export default docRepo