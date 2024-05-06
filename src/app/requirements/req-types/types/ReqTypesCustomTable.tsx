import { createColumnHelper } from '@tanstack/react-table'
import { ReqTypeEntity } from '@/app/requirements/types/req.types'
import { ReqTypesTableOptions } from '../components/ReqTypesTableOptions'

const columnHelper = createColumnHelper<ReqTypeEntity>()

export const reqTypeCustomColumn = [
  columnHelper.display({
    id: 'user-actions',
    cell: (props) => <ReqTypesTableOptions id={props.row.original.id} />,
    header: '',
  }),
  columnHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  columnHelper.accessor('name', {
    cell: (row) => row.getValue(),
    header: 'Nombre',
  }),
]
