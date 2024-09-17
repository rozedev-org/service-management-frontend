import { Box, Flex } from '@chakra-ui/react'
import { CustomTable, CustomTableProps } from '../CustomTable/CustomTable'
import style from './CustomFormTable.module.css'

export function PaginatedFormTable<T>(props: CustomTableProps<T>) {
  const { data, columns, isLoadingData } = props
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
      ></Flex>
    </Box>
  )
}
