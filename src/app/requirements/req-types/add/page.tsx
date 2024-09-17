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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dataTable, setDataTable] = useState<NewReqType[]>([])
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
  const { reqTypeForm } = useCreateReqTypeForm(dataTable)
  // const [dataTable, setDataTable] = useState<NewReqType[]>([
  //   {
  //     name: 'Si',
  //     requirementTypeField: [
  //       {
  //         title: 'Titulo',
  //         order: 1,
  //         type: 'Tipo',
  //         isOptional: true,
  //         isRequired: false,
  //       },
  //       {
  //         title: 'Title',
  //         order: 2,
  //         type: 'Type',
  //         isOptional: false,
  //         isRequired: true,
  //       },
  //     ],
  //   },
  // ])
  const handleInputChange = (value: string | boolean, type: string) => {
    setNewField((prevField) => ({
      ...prevField,
      [type]: value,
    }))
  }

  const updateName = (name: string) => {
    setNameInput(name)
    setDataTable((prevDataTable) =>
      prevDataTable.map((item) => (name ? { ...item, name: name } : item))
    )
  }

  const handleAddField = () => {
    setDataTable((prevDataTable) => {
      const updatedDataTable = [...prevDataTable]
      if (updatedDataTable.length > 0) {
        updatedDataTable[0].requirementTypeField.push(newField)
      } else {
        updatedDataTable.push({
          name: nameInput,
          requirementTypeField: [newField],
        })
      }
      return updatedDataTable
    })
    onClose()
    setRequiredInput(true)
    setOptionalInput(true)
    setNewField({
      title: '',
      type: '',
      order: 1,
      isOptional: false,
      isRequired: false,
    })
  }

  const resetDataTable = () => {
    setDataTable([{ name: '', requirementTypeField: [] }])
  }

  const handleSubmit = () => {
    reqTypeForm.handleSubmit()
  }

  return (
    <CardContainer title='Crear tipo de Requerimiento'>
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          onChange={(e) => {
            updateName(e.target.value)
          }}
        />
      </FormControl>

      <PaginatedFormTable<NewReqType>
        data={dataTable}
        columns={reqTypeFormColumn}
        isLoadingData={true}
      />
      <HStack>
        <Button colorScheme='purple' onClick={(e) => console.log(dataTable)}>
          clg
        </Button>
        <Button colorScheme='yellow' onClick={resetDataTable}>
          Limpiar
        </Button>
        <Button colorScheme='blue' onClick={handleSubmit}>
          Enviar
        </Button>
        <Button onClick={onOpen} colorScheme='green'>
          Agregar
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                      console.log(newField)
                      handleInputChange(optionalInput, 'isOptional')
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='is-required'>Es Requerido?</FormLabel>
                  <Switch
                    id='is-required'
                    onChange={(e) => {
                      handleInputChange(requiredInput, 'isRequired')
                    }}
                  />
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme='blue' onClick={handleAddField}>
              Añadir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </CardContainer>
  )
}
