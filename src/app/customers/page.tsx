/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useCustomers } from './hook/useCustomer'
import { PaginationParams } from '@/common/interfaces/response.interface'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { SearchInput } from '@/components/input/SearchInput'
import { PaginatedTable } from '@/components/table/PaginatedTable/PaginatedTable'
import { useState, useEffect } from 'react'
import { CustomerEntity } from './types/customer.types'
import { customerColumns } from './types/columnDefCustomer'
import AddCustomerButton from './components/AddCustomerButton'

export default function CustomerPage() {
  const [userFilter, setUserFilter] = useState('')
  const handleOnChangeUserFilter = (value: string) => {
    setUserFilter(value)
  }
  const {
    fetchCustomers,
    customer,
    meta,
    handlePageChange,
    handlePerRowsChange,
    isLoading,
  } = useCustomers()
  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
    }
    fetchCustomers(queryPamas)
  }, [])

  return (
    <CardContainer
      title='Lista de Clientes'
      optionsButton={
        <>
          <AddCustomerButton />
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
      {/* {UserTable} */}

      <PaginatedTable<CustomerEntity>
        meta={meta}
        data={customer}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        columns={customerColumns}
        isLoadingData={isLoading}
      />
    </CardContainer>
  )
}
