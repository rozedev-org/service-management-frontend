/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { usersColumns } from './types/columnDef'
import { SearchInput } from '@/components/input/SearchInput'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { AddUserButton } from './components/AddButton'
import { useUsers } from './hook/useUser'
import { UserEntity } from './types/user.types'
import { useEffect, useState } from 'react'
import { PaginatedTable } from '@/components/table/PaginatedTable/PaginatedTable'
import { PaginationParams } from '@/common/interfaces/response.interface'

export default function Users() {
  const [userFilter, setUserFilter] = useState('')
  const handleOnChangeUserFilter = (value: string) => {
    setUserFilter(value)
  }
  const {
    fetchUsers,
    user,
    meta,
    handlePageChange,
    handlePerRowsChange,
    isLoading,
  } = useUsers()
  // const UserTable = CustomTable<UserEntity>({
  //   columns: usersColumns,
  //   data: user,
  // })

  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
    }
    fetchUsers(queryPamas)
  }, [])

  return (
    <CardContainer
      title='Lista de Usuarios'
      optionsButton={<AddUserButton />}
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

      <PaginatedTable<UserEntity>
        meta={meta}
        data={user}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        columns={usersColumns}
        isLoadingData={isLoading}
      />
    </CardContainer>
  )
}
