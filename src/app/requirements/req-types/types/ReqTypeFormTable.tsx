import { createColumnHelper } from '@tanstack/react-table'
import { Button, Checkbox, Input, VStack } from '@chakra-ui/react'
import { NewReqTypeField } from '../../types/requirement-type-field'

const columnHelper = createColumnHelper<NewReqTypeField>()

export const reqTypeFormColumn = (
  handleDeleteField: (index: number) => void
) => [
  columnHelper.display({
    id: 'delete-action',
    cell: (props) => (
      <Button
        variant='outline'
        onClick={() => handleDeleteField(props.row.index)}
      >
        x
      </Button>
    ),
    header: '',
  }),
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
        {row.original.isOptional ? (
          <>
            <Checkbox isDisabled defaultChecked />
          </>
        ) : (
          <>
            <Checkbox isDisabled />
          </>
        )}
      </VStack>
    ),
    header: 'Es Opcional?',
  }),
  columnHelper.accessor('isRequired', {
    cell: ({ row }) => (
      <VStack p={2}>
        {row.original.isRequired ? (
          <>
            <Checkbox isDisabled defaultChecked />
          </>
        ) : (
          <>
            <Checkbox isDisabled />
          </>
        )}
      </VStack>
    ),
    header: 'Es Requerido?',
  }),
]
