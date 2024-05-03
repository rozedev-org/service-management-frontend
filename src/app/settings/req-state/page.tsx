/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ReqStateEntity } from '@/app/requirements/types/req.types'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { CustomTable } from '@/components/table/CustomTable'
import { useRequirementsState } from './hook/useRequirementState'
import { reqStateCustomColumn } from './types/ReqStateCustomTable'
import { AddReqStateButton } from './components/AddReqStateButton'
import { SearchInput } from '@/components/input/SearchInput'
import { useEffect } from 'react'

export default function ReqStatePage() {
  const { reqsState, isLoading, fetchReqState } = useRequirementsState()
  const reqStateTable = CustomTable<ReqStateEntity>({
    columns: reqStateCustomColumn,
    data: reqsState,
  })

  useEffect(() => {
    fetchReqState()
  }, [])

  return (
    <CardContainer
      isLoading={isLoading}
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
