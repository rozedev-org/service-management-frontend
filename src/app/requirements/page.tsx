'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { SearchInput } from '@/components/input/SearchInput'
import { CustomTable } from '@/components/table/CustomTable'
import { RequirementsEntity } from './types/req.types'
import { requirementsColumns } from './types/columnDef'
import { useRequirements } from './hook/useRequirements'
import { AddReqButton } from './components/AddButton'
import { ReqTableOptions } from './components/TableOptions'
import { Box } from '@chakra-ui/react'

export default function Requirements() {
  const requirementsQuery = useRequirements()
  const RequirementsTable = CustomTable<RequirementsEntity>({
    columns: requirementsColumns,
    data: requirementsQuery.data?.data,
  })
  return (
    <CardContainer
      title='Lista de Requerimientos'
      optionsButton={<AddReqButton />}
      searchInput={
        <SearchInput
          maxW={'320px'}
          ml={'auto'}
          onChangeHandler={() => {
            console.log(RequirementsTable)
          }}
        />
      }
    >
      {RequirementsTable}
    </CardContainer>
  )
}
