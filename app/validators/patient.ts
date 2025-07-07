import vine from '@vinejs/vine'
 export const patientValidator = vine.compile(
    vine.object({
        patientName:vine.string().trim().minLength(3).maxLength(40),
        diagnosis:vine.string().trim().minLength(4).maxLength(75),
        doctorId:vine.number(),
        
    })
 ) 
 export const patientPutValidator = vine.compile(vine.object({
    patientName:vine.string().trim().minLength(2).maxLength(50),
    diagnosis:vine.string().trim().minLength(2).maxLength(50),
    doctorId:vine.number(),

 }))
 export const patientPatchValidator = vine.compile(vine.object({
    patientName:vine.string().trim().minLength(2).maxLength(50).optional(),
    diagnosis:vine.string().trim().minLength(2).maxLength(50).optional(),
    doctorId:vine.number().optional(),

 }))