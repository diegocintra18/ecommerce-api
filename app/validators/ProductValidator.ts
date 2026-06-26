import vine from '@vinejs/vine'

export const CreateProductValidator = vine.create({
  name: vine.string().minLength(3).maxLength(255),
  sku: vine.string().unique({
    table: 'products',
    column: 'sku',
  }),
  price: vine.number(),
  sale_price: vine.number(),
  status: vine.number(),
  categories: vine.array(vine.number()),
})

export const ProductFiltersValidator = vine.create({
  search: vine.string().optional(),
  status: vine.enum(['active', 'inactive'] as const).optional(),
  sort: vine.string().optional(),
  page: vine.number().optional(),
  limit: vine.number().optional(),
})

export type ProductFilters = {
  search?: string
  status?: 'active' | 'inactive'
  sort?: string
  page?: number
  limit?: number
}
