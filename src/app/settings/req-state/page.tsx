'use client'
import { ReqStateEntity } from '@/app/requirements/types/req.types'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { CustomTable } from '@/components/table/CustomTable'
import { useRequirementsState } from './hook/useRequirementState'
import { reqStateCustomColumn } from './types/ReqStateCustomTable'
import { AddReqStateButton } from './components/AddReqStateButton'
import { SearchInput } from '@/components/input/SearchInput'

export default function ReqStatePage() {
  const { data } = useRequirementsState()
  const reqStateData = data?.data
  const reqStateTable = CustomTable<ReqStateEntity>({
    columns: reqStateCustomColumn,
    data: reqStateData,
  })
  return (
    <CardContainer
      title='Estados de Requerimientos'
      optionsButton={<AddReqStateButton />}
      searchInput={
        <SearchInput
          maxW={'320px'}
          ml={'auto'}
          onChangeHandler={() => {
            console.log('searchInput')
          }}
        />
      }
    >
      {reqStateTable}
    </CardContainer>
  )
}
