export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface PaginationMeta {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class PaginationParams {
  order?: Order = Order.DESC
  page: number = 1
  take: number = 8
  getAll?: boolean
}
