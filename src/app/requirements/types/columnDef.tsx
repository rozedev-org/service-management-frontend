import { createColumnHelper } from '@tanstack/react-table'
import { RequirementsEntity } from './requirements.types'
import { ReqTableOptions } from '../components/TableOptions'

const columnHelper = createColumnHelper<RequirementsEntity>()

export const requirementsColumns = [
  columnHelper.display({
    id: 'requirements-actions',
    cell: (props) => <ReqTableOptions id={props.row.original.id} />,
    header: '',
  }),
  columnHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  columnHelper.accessor('user.userName', {
    cell: (row) => row.getValue() || 'Vacio',
    header: 'Responsable',
  }),
]
