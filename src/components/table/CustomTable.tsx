import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

type CustomTable<T> = {
  columns: ColumnDef<T, any>[]
  data: T[] | undefined
}

export function CustomTable<T>(props: CustomTable<T>) {
  const defaultData = useMemo(() => [], [])

  const table = useReactTable({
    columns: props.columns,
    data: props.data || defaultData,
    getCoreRowModel: getCoreRowModel(),
  })
  const tabla = table.getRowModel().rows.map((row) => (
    <>
      {row.getVisibleCells().map((cell) => (
        <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
      ))}
    </>
  ))

  return (
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
  )
}
