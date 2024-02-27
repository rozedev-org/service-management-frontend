export interface PaginatedResponse<T> {
  data: T[]
  meta: Meta
}

export interface Meta {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
