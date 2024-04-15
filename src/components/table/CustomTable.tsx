import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  chakra,
  Heading,
} from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import styles from './ResponsiveTable.module.css'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

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
    <TableContainer
      overflowY={'scroll'}
      className={styles.scroll}
      style={{ height: '40vh' }}
    >
      <Table variant='simple' size={'sm'} className={`${styles.responsive}`}>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span pl='4'>
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <TriangleDownIcon aria-label='sorted descending' />
                        ) : (
                          <TriangleUpIcon aria-label='sorted ascending' />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {props.data?.length < 1 ? (
            <Tr>
              <Td colSpan={table.getAllColumns().length} textAlign={'center'}>
                <Heading color={'black'}>
                  No se han encontrado registros
                </Heading>
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = cell.column.columnDef.meta
                  return (
                    <Td
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                      data-label={cell.column.columnDef.header}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
