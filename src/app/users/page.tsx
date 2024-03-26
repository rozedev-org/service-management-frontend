'use client'
import { CustomTable } from '@/components/table/CustomTable'
import { usersColumns } from './types/columnDef'
import { SearchInput } from '@/components/input/SearchInput'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { AddUserButton } from './components/AddButton'
import { useUsers } from './hook/useUser'
import { UserEntity } from './types/user.types'
import { useState } from 'react'

export default function Users() {
  const [userFilter, setUserFilter] = useState('')
  const handleOnChangeUserFilter = (value: string) => {
    setUserFilter(value)
  }
  const userQuery = useUsers()
  const UserTable = CustomTable<UserEntity>({
    columns: usersColumns,
    data: userQuery.data?.data,
  })

  return (
    <CardContainer
      title='Lista de Usuarios'
      optionsButton={<AddUserButton />}
      searchInput={
        <SearchInput
          maxW={'320px'}
          ml={'auto'}
          onChangeHandler={handleOnChangeUserFilter}
        />
      }
    >
      {UserTable}
    </CardContainer>
  )
}
