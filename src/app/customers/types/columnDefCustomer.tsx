import { createColumnHelper } from '@tanstack/react-table'
import { CustomerEntity } from './customer.types'
import CustomerTableOptions from '../components/CustomerTableOptions'

const columnHelper = createColumnHelper<CustomerEntity>()

export const customerColumns = [
  columnHelper.display({
    id: 'customers-actions',
    cell: (props) => <CustomerTableOptions id={props.row.original.id} />,
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
