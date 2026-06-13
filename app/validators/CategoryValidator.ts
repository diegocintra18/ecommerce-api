import vine from '@vinejs/vine'

export const CreateCategoryValidator = vine.create({
  name: vine.string().minLength(3).maxLength(255),
})
