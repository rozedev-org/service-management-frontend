import { createColumnHelper } from '@tanstack/react-table'
import { ReqStateTableOptions } from '../components/ReqStateTableOptions'
import { ReqStateEntity } from '@/app/requirements/types/requirement-state.type'

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
]
