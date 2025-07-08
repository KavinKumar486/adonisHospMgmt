import vine from '@vinejs/vine'

export const docterGetIdValidator = vine.compile(
  vine.object({
    id: vine.number().optional(),
  })
)


export const docterIdValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)
export const doctorInsertValidator = vine.compile(
  vine.object({
    name: vine.string()
      .trim()
      .minLength(3)
      .maxLength(60)
      .transform((val) => val.toLowerCase()),

    expertise: vine.string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .transform((val) => val.toLowerCase()),
  })
)
export const doctorPatchValidator = vine.compile(
  vine.object({
    name: vine.string()
      .trim()
      .minLength(2)
      .maxLength(30)
      .optional()
      .transform((val) => val.toLowerCase()),

    expertise: vine.string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .optional()
      .transform((val) => val.toLowerCase()),
  })
)


export const doctorPutValidator = vine.compile(
  vine.object({
    name: vine.string()
      .trim()
      .minLength(2)
      .maxLength(30)
      .transform((val) => val.toLowerCase()),

    expertise: vine.string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .transform((val) => val.toLowerCase()),
  })
)

export const doctorIdsValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number()),
  })
)
