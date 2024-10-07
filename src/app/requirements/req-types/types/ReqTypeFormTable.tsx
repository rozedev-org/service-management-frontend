import { createColumnHelper } from '@tanstack/react-table'
import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react'
import { NewReqTypeField } from '../../types/requirement-type-field'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import React from 'react'

const columnHelper = createColumnHelper<NewReqTypeField>()

export const reqTypeFormColumn = (
  handleDeleteField: (index: number) => void,
  handleUpdateField: (index: number) => void,
  onOpenModal: () => void
) => [
  columnHelper.display({
    id: 'delete-action',
    cell: (props) => (
      <HStack>
        <Button
          variant='link'
          onClick={() => handleDeleteField(props.row.index)}
        >
          <IconButton
            ml={'auto'}
            size='sm'
            icon={<DeleteIcon />}
            aria-label={''}
          />
        </Button>
        <Button
          variant='link'
          onClick={(e) => {
            onOpenModal(), handleUpdateField(props.row.index)
          }}
        >
          <IconButton
            ml={'auto'}
            size='sm'
            icon={<EditIcon />}
            aria-label={''}
          />
        </Button>
      </HStack>
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
