import { User } from '@/hook/useUser'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<User>()

export const usersColumns = [
  columnHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
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
