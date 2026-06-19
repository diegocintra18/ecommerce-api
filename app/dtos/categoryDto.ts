export interface CreateCategoryDTO{
    name: string
    parent_id?: number
}

export interface UpdateCategoryDTO{
    name: string
    slug?: string
    parent_id?: number
    status?: number
}