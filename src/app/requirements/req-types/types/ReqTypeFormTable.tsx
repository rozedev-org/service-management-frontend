import { createColumnHelper } from '@tanstack/react-table'
import { NewReqType } from '../../types/requirement-type.types'
import { Input, VStack } from '@chakra-ui/react'

const columnHelper = createColumnHelper<NewReqType>()

export const reqTypeFormColumn = [
  columnHelper.accessor('requirementTypeField.title', {
    cell: (row) =>
      row.row.original.requirementTypeField.map((data) => (
        <>
          <VStack p={2}>
            <Input value={data.title} isReadOnly={true} />
          </VStack>
        </>
      )),
    header: 'Titulo',
  }),
  columnHelper.accessor('requirementTypeField.type', {
    cell: (row) =>
      row.row.original.requirementTypeField.map((data) => (
        <>
          <VStack p={2}>
            <Input value={data.type} isReadOnly={true} />
          </VStack>
        </>
      )),
    header: 'Tipo',
  }),
  columnHelper.accessor('requirementTypeField.order', {
    cell: (row) =>
      row.row.original.requirementTypeField.map((data) => (
        <>
          <VStack p={2}>
            <Input value={data.order} isReadOnly={true} />
          </VStack>
        </>
      )),
    header: 'Orden',
  }),
  columnHelper.accessor('requirementTypeField.isOptional', {
    cell: (row) =>
      row.row.original.requirementTypeField.map((data) => (
        <>
          <VStack p={2}>
            <Input value={`${data.isOptional}`} isReadOnly={true} />
          </VStack>
        </>
      )),
    header: 'Es Opcional?',
  }),
  columnHelper.accessor('requirementTypeField.isRequired', {
    cell: (row) =>
      row.row.original.requirementTypeField.map((data) => (
        <>
          <VStack p={2}>
            <Input value={`${data.isRequired}`} isReadOnly={true} />
          </VStack>
        </>
      )),
    header: 'Es Requerido?',
  }),
]
