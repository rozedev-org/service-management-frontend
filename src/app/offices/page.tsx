/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { PaginationParams } from '@/common/interfaces/response.interface'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { SearchInput } from '@/components/input/SearchInput'
import { PaginatedTable } from '@/components/table/PaginatedTable/PaginatedTable'
import { useState, useEffect } from 'react'
import { useOffices } from './hook/useOffice'
import { OfficeEntity } from './types/office.types'
import { officeColumns } from './types/columnDefOffice'
import AddOfficeButton from './components/AddOfficeButton'

export default function OfficePage() {
  const [userFilter, setUserFilter] = useState('')
  const handleOnChangeUserFilter = (value: string) => {
    setUserFilter(value)
  }
  const {
    meta,
    handlePageChange,
    handlePerRowsChange,
    isLoading,
    fetchOffices,
    office,
  } = useOffices()
  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
    }
    fetchOffices(queryPamas)
  }, [])

  return (
    <CardContainer
      title='Lista de Sucursales'
      optionsButton={
        <>
          <AddOfficeButton />
        </>
      }
      isLoading={isLoading}
      searchInput={
        <SearchInput
          maxW={'320px'}
          ml={'auto'}
          onChangeHandler={handleOnChangeUserFilter}
        />
      }
    >
      <PaginatedTable<OfficeEntity>
        meta={meta}
        data={office}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        columns={officeColumns}
        isLoadingData={isLoading}
      />
    </CardContainer>
  )
}
