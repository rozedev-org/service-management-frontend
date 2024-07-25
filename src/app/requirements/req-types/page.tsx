/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { CustomTable } from '@/components/table/CustomTable/CustomTable'
import { SearchInput } from '@/components/input/SearchInput'
import { reqTypeCustomColumn } from './types/ReqTypesCustomTable'
import { useRequirementsTypes } from './hook/useRequirementsTypes'
import { useEffect } from 'react'
import { AddReqTypeButton } from './components/AddReqTypeButton'
import { PaginationParams } from '@/common/interfaces/response.interface'
import { PaginatedTable } from '@/components/table/PaginatedTable/PaginatedTable'
import { ReqTypeEntity } from '../types/requirement-type.types'

export default function ReqTypePage() {
  const {
    reqTypes,
    fetchReqTypes,
    isLoading,
    meta,
    handlePageChange,
    handlePerRowsChange,
  } = useRequirementsTypes()

  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
    }
    fetchReqTypes(queryPamas)
  }, [])

  return (
    <CardContainer
      isLoading={isLoading}
      title='Lista de Tipos de Requerimientos'
      optionsButton={<AddReqTypeButton />}
      searchInput={
        <SearchInput
          maxW={'320px'}
          ml={'auto'}
          onChangeHandler={() => {
            console.log('ReqTypePage')
          }}
        />
      }
    >
      <PaginatedTable<ReqTypeEntity>
        meta={meta}
        data={reqTypes}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        columns={reqTypeCustomColumn}
        isLoadingData={isLoading}
      />
    </CardContainer>
  )
}
