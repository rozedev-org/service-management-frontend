/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { NewReqType } from '../../types/requirement-type.types'
import { reqTypeFormColumn } from '../types/ReqTypeFormTable'
import { NewReqTypeField } from '../../types/requirement-type-field'
import { PaginatedFormTable } from '@/components/table/CustomFormTable/CustomFormTable'
import { useCreateReqTypeForm } from '../hook/useRequirementsTypes'

export default function ReqTypesAddPage() {
  const {
    isOpen: isOpenAddField,
    onOpen: onOpenAddField,
    onClose: onCloseAddField,
  } = useDisclosure()
  const {
    isOpen: isOpenEditField,
    onOpen: onOpenEditField,
    onClose: onCloseEditField,
  } = useDisclosure()
  const [newReqType, setNewReqType] = useState<NewReqType>({
    name: '',
    requirementTypeField: [],
  })
  const [requiredInput, setRequiredInput] = useState(true)
  const [optionalInput, setOptionalInput] = useState(true)
  const [nameInput, setNameInput] = useState('')
  const [newField, setNewField] = useState<NewReqTypeField>({
    title: '',
    type: '',
    order: 1,
    isOptional: false,
    isRequired: false,
  })
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<number | null>(
    null
  )

  const { reqTypeForm } = useCreateReqTypeForm(newReqType)

  const handleInputChange = (value: string | boolean, type: string) => {
    setNewField((prevField) => ({
      ...prevField,
      [type]: value,
    }))
  }

  const updateName = (name: string) => {
    setNameInput(name)
    setNewReqType((previousValue) => ({ ...previousValue, name }))
  }

  const handleAddField = () => {
    setNewReqType((previousValue) => ({
      ...previousValue,
      requirementTypeField: [...previousValue.requirementTypeField, newField],
    }))

    onCloseAddField()
    setNewField({
      title: '',
      type: '',
      order: 1,
      isOptional: false,
      isRequired: false,
    })
  }

  const resetDataTable = () => {
    setNewReqType({ name: '', requirementTypeField: [] })
  }

  const handleSubmit = () => {
    reqTypeForm.handleSubmit()
  }
  const handleDeleteField = (index: number) => {
    setNewReqType((prevReqType) => ({
      ...prevReqType,
      requirementTypeField: prevReqType.requirementTypeField.filter(
        (_, i) => i !== index
      ),
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
        title: '',
        type: '',
        order: 1,
        isOptional: false,
        isRequired: false,
      })
    }
  }

  return (
    <CardContainer title='Crear tipo de Requerimiento'>
      <FormControl isRequired pb={4}>
        <FormLabel>Nombre</FormLabel>
        <Input
          onChange={(e) => {
            updateName(e.target.value)
          }}
        />
      </FormControl>

      <PaginatedFormTable<NewReqTypeField>
        data={newReqType.requirementTypeField}
        columns={reqTypeFormColumn(
          handleDeleteField,
          handleUpdateField,
          onOpenEditField
        )}
        isLoadingData={false}
      />
      <HStack>
        <Button colorScheme='yellow' onClick={resetDataTable}>
          Limpiar
        </Button>
        <Button colorScheme='blue' onClick={handleSubmit}>
          Enviar
        </Button>
        <Button onClick={onOpenAddField} colorScheme='green'>
          Agregar
        </Button>
      </HStack>

      {/* Modal de agregado de datos */}

      <Modal isOpen={isOpenAddField} onClose={onCloseAddField} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nuevo Campo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack w={'100%'}>
              <FormControl isRequired>
                <FormLabel>Titulo</FormLabel>
                <Input
                  onChange={(e) => {
                    handleInputChange(e.target.value, 'title')
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Tipo de Campo</FormLabel>
                <Select
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
            <Button colorScheme='red' mr={3} onClick={onCloseAddField}>
              Cerrar
            </Button>
            <Button colorScheme='blue' onClick={handleAddField}>
              Añadir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
