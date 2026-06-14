import vine from '@vinejs/vine'

export const CategoryFiltersValidator = vine.create({
  search: vine.string().optional(),
  status: vine.enum(['active', 'inactive'] as const).optional(),
  sort: vine.string().optional(),
  page: vine.number().optional(),
  limit: vine.number().optional(),
})

export type CategoryFilters = {
  search?: string
  status?: 'active' | 'inactive'
  sort?: string
  page?: number
  limit?: number
}
