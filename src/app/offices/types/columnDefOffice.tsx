import { createColumnHelper } from '@tanstack/react-table'
import { OfficeEntity } from './office.types'
import OfficeTableOptions from '../components/OfficeTableOptions'

const columnHelper = createColumnHelper<OfficeEntity>()

export const officeColumns = [
  columnHelper.display({
    id: 'offices-actions',
    cell: (props) => <OfficeTableOptions id={props.row.original.id} />,
    header: '',
  }),
  columnHelper.accessor('id', {
    cell: (row) => row.getValue(),
    header: 'ID',
  }),
  columnHelper.accessor('name', {
    cell: (row) => row.getValue(),
    header: 'Cliente',
  }),
]
