import { createColumnHelper } from '@tanstack/react-table'
import { RequirementsEntity } from './req.types'
import { ReqTableOptions } from '../components/TableOptions'

const columnHelper = createColumnHelper<RequirementsEntity>()

export const requirementsColumns = [
  columnHelper.display({
    id: 'user-actions',
    cell: (props) => <ReqTableOptions id={props.row.original.id} />,
    header: '',
  }),
  columnHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  columnHelper.accessor('title', {
    cell: (row) => row.getValue(),
    header: 'Requerimiento',
  }),
  columnHelper.accessor('userId', {
    cell: (row) => row.getValue(),
    header: 'Responsable',
  }),
]
