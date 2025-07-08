import vine from '@vinejs/vine'

export const medicineValidator = vine.compile(
  vine.object({
    medicineName: vine.string().trim().minLength(2).maxLength(255),
    cost: vine.number().min(0),
  })
)

export const medicinePatchValidator = vine.compile(
  vine.object({
    medicineName: vine.string().trim().minLength(2).maxLength(255).optional(),
    cost: vine.number().min(0).optional(),
  })
)

export const medicinePutValidator = vine.compile(
  vine.object({
    medicineName: vine.string().trim().minLength(2).maxLength(255),
    cost: vine.number().min(0),
  })
)
