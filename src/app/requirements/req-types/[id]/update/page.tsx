/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { useEffect, useState } from 'react'
import {
  useReqTypeUpdateForm,
  useRequirementType,
} from '../../hook/useRequirementsTypes'
import {
  NewReqTypeField,
  ReqTypeFieldEntity,
} from '@/app/requirements/types/requirement-type-field'
import { PaginatedFormTable } from '@/components/table/CustomFormTable/CustomFormTable'
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Select,
  Switch,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'
import { ReqTypeEntity } from '@/app/requirements/types/requirement-type.types'
import { reqTypeEditFormColumn } from '../../types/ReqTypeEditFormTable'

export default function ReqTypeUpdatePage({
  params,
}: {
  params: { id: number }
}) {
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<number | null>(
    null
  )
  const [requiredInput, setRequiredInput] = useState(true)
  const [optionalInput, setOptionalInput] = useState(true)
  const [newField, setNewField] = useState<ReqTypeFieldEntity>({
    id: 0,
    requirementTypeId: 0,
    title: '',
    type: '',
    order: 1,
    isOptional: false,
    isRequired: false,
    options: [],
  })
  const [newReqType, setNewReqType] = useState<ReqTypeEntity>({
    id: 0,
    name: '',
    requirementTypeField: [],
  })
  const { updateReqTypeForm } = useReqTypeUpdateForm(newReqType)
  const { isLoading, fetchReqType, reqType } = useRequirementType()
  const {
    isOpen: isOpenEditField,
    onOpen: onOpenEditField,
    onClose: onCloseEditField,
  } = useDisclosure()

  useEffect(() => {
    if (reqType) {
      setNewReqType(reqType)
    }
  }, [reqType])

  useEffect(() => {
    fetchReqType(params.id)
  }, [])

  const handleInputChange = (value: string | boolean, type: string) => {
    setNewField((prevField) => ({
      ...prevField,
      [type]: value,
    }))
  }
  const handleUpdateField = (index: number) => {
    const fieldToUpdate = newReqType.requirementTypeField[index]
    setNewField(fieldToUpdate)
    setSelectedFieldIndex(index)
    onOpenEditField()
  }
  const handleSaveUpdatedField = () => {
    if (selectedFieldIndex !== null) {
      setNewReqType((prevReqType) => ({
        ...prevReqType,
        requirementTypeField: prevReqType.requirementTypeField.map((field, i) =>
          i === selectedFieldIndex ? newField : field
        ),
      }))

      onCloseEditField()
      setSelectedFieldIndex(null)
      setNewField({
        id: 0,
        requirementTypeId: 0,
        title: '',
        type: '',
        order: 1,
        isOptional: false,
        isRequired: false,
        options: [],
      })
    }
  }
  const updateName = (name: string) => {
    setNewReqType((previousValue) => ({ ...previousValue, name }))
  }
  return (
    <CardContainer
      title='Actualizar Tipo de Requerimiento'
      isLoading={isLoading}
    >
      <FormControl isRequired pb={4}>
        <FormLabel>Nombre</FormLabel>
        <Input
          value={newReqType.name}
          onChange={(e) => {
            updateName(e.target.value)
          }}
        />
      </FormControl>

      <PaginatedFormTable<NewReqTypeField>
        data={newReqType.requirementTypeField}
        columns={reqTypeEditFormColumn(handleUpdateField, onOpenEditField)}
        isLoadingData={false}
      />
      <HStack>
        <Button
          colorScheme='blue'
          onClick={() => {
            updateReqTypeForm.handleSubmit()
          }}
        >
          Enviar
        </Button>
      </HStack>

      {/* Modal de modificacion de datos */}

      <Modal isOpen={isOpenEditField} onClose={onCloseEditField} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Campo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack w={'100%'}>
              <FormControl isRequired>
                <FormLabel>Titulo</FormLabel>
                <Input
                  value={newField.title}
                  onChange={(e) => {
                    handleInputChange(e.target.value, 'title')
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Tipo de Campo</FormLabel>
                <Select
                  value={newField.type}
                  defaultValue=''
                  onChange={(e) => {
                    handleInputChange(e.target.value, 'type')
                  }}
                >
                  <option value='' disabled hidden>
                    Selecciona un tipo
                  </option>
                  <option value='date'>Fecha</option>
                  <option value='email'>Email</option>
                  <option value='number'>Numero de telefono</option>
                  <option value='text'>Texto</option>
                  <option value='checkbox'>Check</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel pt='20px'>Orden</FormLabel>
                <Input
                  value={newField.order}
                  type='number'
                  min={0}
                  onChange={(e) => {
                    handleInputChange(e.target.value, 'order')
                  }}
                />
              </FormControl>

              <HStack w={'100%'}>
                <FormControl>
                  <FormLabel htmlFor='is-optional'>Es Opcional?</FormLabel>
                  <Switch
                    defaultChecked={newField.isOptional}
                    id='is-optional'
                    onChange={(e) => {
                      setOptionalInput(!optionalInput)
                      handleInputChange(optionalInput, 'isOptional')
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='is-required'>Es Requerido?</FormLabel>
                  <Switch
                    defaultChecked={newField.isRequired}
                    id='is-required'
                    onChange={(e) => {
                      setRequiredInput(!requiredInput)
                      handleInputChange(requiredInput, 'isRequired')
                    }}
                  />
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onCloseEditField}>
              Cerrar
            </Button>
            <Button colorScheme='blue' onClick={handleSaveUpdatedField}>
              Actualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </CardContainer>
  )
}
