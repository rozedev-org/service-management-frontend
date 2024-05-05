import { useState } from 'react'
import {
  PaginatedResponse,
  PaginationMeta,
  PaginationParams,
} from '../interfaces/response.interface'

export const usePaginated = <T>(
  fetchData: (
    params: PaginationParams
  ) => Promise<PaginatedResponse<T> | undefined>
) => {
  const [take, setTake] = useState(5)
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  })

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1)

    const queryPamas: PaginationParams = {
      page: selectedItem.selected + 1,
      take,
    }
    fetchData(queryPamas)
  }

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setTake(newPerPage)
    setPage(page)

    const queryPamas: PaginationParams = {
      page,
      take: newPerPage,
    }

    await fetchData(queryPamas)
  }

  return {
    meta,
    page,
    handlePageChange,
    handlePerRowsChange,
    setMeta,
  }
}
