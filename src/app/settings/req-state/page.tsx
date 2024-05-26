/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { useRequirementsState } from './hook/useRequirementState'
import { reqStateCustomColumn } from './types/ReqStateCustomTable'
import { AddReqStateButton } from './components/AddReqStateButton'
import { SearchInput } from '@/components/input/SearchInput'
import { useEffect } from 'react'
import { PaginatedTable } from '@/components/table/PaginatedTable/PaginatedTable'
import { PaginationParams } from '@/common/interfaces/response.interface'
import { ReqStateEntity } from '@/app/requirements/types/requirement-state.type'

export default function ReqStatePage() {
  const {
    reqsState,
    isLoading,
    fetchReqState,
    meta,
    handlePageChange,
    handlePerRowsChange,
  } = useRequirementsState()

  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
    }
    fetchReqState(queryPamas)
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
      <PaginatedTable<ReqStateEntity>
        meta={meta}
        data={reqsState}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        columns={reqStateCustomColumn}
        isLoadingData={isLoading}
      />
    </CardContainer>
  )
}
