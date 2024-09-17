import { createColumnHelper } from '@tanstack/react-table'
import { ReqStateEntity } from '@/app/requirements/types/requirement-state.type'
import { ReqStateTableOptions } from '../components/ReqStateTableOptions'

const columnHelper = createColumnHelper<ReqStateEntity>()

export const reqStateCustomColumn = [
  columnHelper.display({
    id: 'user-actions',
    cell: (props) => <ReqStateTableOptions id={props.row.original.id} />,
    header: '',
  }),
  columnHelper.accessor('secuence', {
    cell: (row) => row.getValue(),
    header: 'Secuencia',
  }),
  columnHelper.accessor('title', {
    cell: (row) => row.getValue(),
    header: 'Titulo',
  }),
  columnHelper.accessor('stateType', {
    cell: (row) => row.getValue(),
    header: 'Tipo',
  }),
]
