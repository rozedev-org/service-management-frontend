import { createColumnHelper } from '@tanstack/react-table'
import { Input, VStack } from '@chakra-ui/react'
import { NewReqTypeField } from '../../types/requirement-type-field'

const columnHelper = createColumnHelper<NewReqTypeField>()

export const reqTypeFormColumn = [
  columnHelper.accessor('title', {
    cell: ({ row }) => (
      <VStack p={2}>
        <Input value={row.original.title} isReadOnly={true} />
      </VStack>
    ),
    header: 'Titulo',
  }),
  columnHelper.accessor('type', {
    cell: ({ row }) => (
      <VStack p={2}>
        <Input value={row.original.type} isReadOnly={true} />
      </VStack>
    ),
    header: 'Tipo',
  }),
  columnHelper.accessor('order', {
    cell: ({ row }) => (
      <VStack p={2}>
        <Input value={row.original.order} isReadOnly={true} />
      </VStack>
    ),
    header: 'Orden',
  }),
  columnHelper.accessor('isOptional', {
    cell: ({ row }) => (
      <VStack p={2}>
        <Input value={`${row.original.isOptional}`} isReadOnly={true} />
      </VStack>
    ),
    header: 'Es Opcional?',
  }),
  columnHelper.accessor('isRequired', {
    cell: ({ row }) => (
      <VStack p={2}>
        <Input value={`${row.original.isRequired}`} isReadOnly={true} />
      </VStack>
    ),
    header: 'Es Requerido?',
  }),
]
