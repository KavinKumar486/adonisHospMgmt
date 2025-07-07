import vine from '@vinejs/vine'


export const doctorInsertValidator = vine.compile(
    
    vine.object({
        name:vine.string().trim().minLength(3).maxLength(60),
        expertise: vine.string().trim().minLength(3).maxLength(100),
    })
)
 export const doctorPatchValidator = vine.compile(
    vine.object({
        name:vine.string().trim().minLength(2).maxLength(30).optional(),
        expertise:vine.string().trim().minLength(3).maxLength(100).optional()
    })
 )

 export const doctorPutValidator = vine.compile(
    vine.object({
        name:vine.string().trim().minLength(2).maxLength(30),
        expertise:vine.string().trim().minLength(3).maxLength(100)
    })
 )
