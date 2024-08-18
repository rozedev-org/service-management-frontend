import { createColumnHelper } from '@tanstack/react-table'
import { UserEntity } from './user.types'
import { UserTableOptions } from '../components/TableOptions'

const columnHelper = createColumnHelper<UserEntity>()

export const usersColumns = [
  columnHelper.display({
    id: 'user-actions',
    cell: (props) => <UserTableOptions id={props.row.original.id} />,
    header: '',
  }),
  columnHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  columnHelper.accessor('userName', {
    cell: (row) => row.getValue(),
    header: 'Nombre de Usuario',
  }),
  columnHelper.accessor('firstName', {
    cell: (row) => row.getValue(),
    header: 'Nombre',
  }),
  columnHelper.accessor('lastName', {
    cell: (row) => row.getValue(),
    header: 'Apellido',
  }),
]
