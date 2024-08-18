import { createColumnHelper } from '@tanstack/react-table'
import { ProfileEntity } from './profile.types'
import { ProfileTableOptions } from '../components/ProfileTableOptions'

const columnHelper = createColumnHelper<ProfileEntity>()

export const profilesColumns = [
  columnHelper.display({
    id: 'profile-actions',
    cell: (props) => <ProfileTableOptions id={props.row.original.id} />,
    header: '',
  }),
  columnHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  columnHelper.accessor('name', {
    cell: (row) => row.getValue(),
    header: 'Perfil',
  }),
]
