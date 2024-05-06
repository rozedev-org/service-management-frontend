/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { SearchInput } from '@/components/input/SearchInput'
import { CustomTable } from '@/components/table/CustomTable/CustomTable'
import { RequirementsEntity } from './types/req.types'
import { requirementsColumns } from './types/columnDef'
import { useRequirements } from './hook/useRequirements'
import { AddReqButton } from './components/AddButton'
import { useEffect } from 'react'
import ReqTypeButton from './req-types/components/ReqTypeButton'
import { PaginatedTable } from '@/components/table/PaginatedTable/PaginatedTable'
import { PaginationParams } from '@/common/interfaces/response.interface'

export default function Requirements() {
  const {
    requirements,
    fetchReqs,
    isLoading,
    meta,
    handlePageChange,
    handlePerRowsChange,
  } = useRequirements()

  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
    }
    fetchReqs(queryPamas)
  }, [])

  return (
    <CardContainer
      isLoading={isLoading}
      title='Lista de Requerimientos'
      optionsButton={
        <>
          <AddReqButton />
          <ReqTypeButton />
        </>
      }
      searchInput={
        <SearchInput
          maxW={'320px'}
          ml={'auto'}
          onChangeHandler={() => {
            // console.log(RequirementsTable)
          }}
        />
      }
    >
      <PaginatedTable<RequirementsEntity>
        columns={requirementsColumns}
        data={requirements}
        meta={meta}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        isLoadingData={isLoading}
      />
      {/* {RequirementsTable} */}
    </CardContainer>
  )
}
