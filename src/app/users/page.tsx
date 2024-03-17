'use client'
import { CustomTable } from '@/components/table/CustomTable'
import { usersColumns } from './types/columnDef'
import { SearchInput } from '@/components/input/SearchInput'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { AddUserButton } from './components/AddButton'
import { useUser } from './hook/useUser'
import { User } from './types/user.types'

export default function Users() {
  const userQuery = useUser()

  const UserTable = CustomTable<User>({
    columns: usersColumns,
    data: userQuery.data?.data,
  })

  return (
    <CardContainer
      title='Lista de Usuarios'
      optionsButton={<AddUserButton />}
      searchInput={<SearchInput maxW={'320px'} ml={'auto'} />}
    >
      {UserTable}
    </CardContainer>
  )
}
