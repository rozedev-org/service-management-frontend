/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { User, useUser } from '@/hook/useUser'
import { Table, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  PaginationState,
  RowModel,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

export default function Users() {
  const { users, fetchUsers } = useUser()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const fetchData = async (pagination: PaginationState) => {
    const response = await fetchUsers(pagination.pageIndex + 1)
    return {
      rows: response?.data,
      pageCount: response?.meta.pageCount,
      rowCount: response?.meta.itemCount,
    }
  }
  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchData(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  })

  const columnHelper = createColumnHelper<User>()

  const userColumns = [
    columnHelper.accessor('id', {
      cell: (row) => row.getValue(),
    }),
    columnHelper.accessor('firstName', {
      cell: (row) => row.getValue(),
    }),
    columnHelper.accessor('lastName', {
      cell: (row) => row.getValue(),
    }),
  ]

  const defaultData = useMemo(() => [], [])

  const table = useReactTable({
    columns: userColumns,
    data: dataQuery.data?.rows ?? defaultData,
    getCoreRowModel: getCoreRowModel(),
    rowCount: dataQuery.data?.rowCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
  })

  useEffect(() => {
    fetchUsers(1)
  }, [])

  return (
    <VStack>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={`headerGroup ${headerGroup.id}`}>
              {headerGroup.headers.map((header) => (
                <Th key={`header ${header.id}`}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={`row ${row.id}`}>
              {row.getVisibleCells().map((cell) => (
                <Td key={`cell ${cell.id}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  )
}
