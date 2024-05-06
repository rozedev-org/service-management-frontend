import { ColumnDef, ColumnHelper } from '@tanstack/react-table'
import { Box, Flex, FormControl, FormLabel, Select } from '@chakra-ui/react'
import style from './PaginatedTable.module.css'
import { TablePagination } from '../TablePagination/TablePagination'
import { CustomTable, CustomTableProps } from '../CustomTable/CustomTable'
import { PaginationMeta } from '@/common/interfaces/response.interface'

interface PaginatedTableProps<T> extends CustomTableProps<T> {
  meta: PaginationMeta
  handlePageChange: (selectedItem: { selected: number }) => void
  handlePerRowsChange: (newPerPage: number, page: number) => Promise<void>
  height?: string
}

export function PaginatedTable<T>(props: PaginatedTableProps<T>) {
  const {
    meta,
    data,
    handlePageChange,
    columns,
    handlePerRowsChange,
    isLoadingData,
    height,
  } = props
  return (
    <Box w={'100%'}>
      <CustomTable
        data={data}
        columns={columns}
        isLoadingData={isLoadingData}
      />

      <Flex
        w={'100%'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        className={style.paginatedTable}
      >
        <Box w={'15rem'}>
          <FormControl display={'flex'} alignItems={'center'} gap={2}>
            <FormLabel m={0}>Filas por pagina:</FormLabel>
            <Select
              w={'5rem'}
              size={'sm'}
              borderRadius={5}
              onChange={(e) => {
                const newPerPage = parseInt(e.target.value)
                handlePerRowsChange(newPerPage, meta.page)
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
              <option>30</option>
            </Select>
          </FormControl>
        </Box>
        <Box>
          {meta.page} - {meta.take} de {meta.itemCount}
        </Box>
        <TablePagination
          handlePageChange={handlePageChange}
          pageCount={meta.pageCount}
        />
      </Flex>
    </Box>
  )
}
