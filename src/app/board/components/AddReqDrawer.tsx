/* eslint-disable react-hooks/exhaustive-deps */
import { useCreateReqForm } from '@/app/requirements/hook/useRequirements'
import { useUsers } from '@/app/users/hook/useUser'
import { PaginationParams } from '@/common/interfaces/response.interface'
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Tooltip,
  IconButton,
  HStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useRefreshSignal } from '../states/useRefreshSignal'
import { useReqId } from '@/states/useReqId'

export const AddReqDrawer = () => {
  const { setId, id } = useReqId()
  const { setOnRefresh } = useRefreshSignal()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ReqForm } = useCreateReqForm()
  const { user, fetchUsers } = useUsers()
  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
      getAll: true,
    }
    fetchUsers(queryPamas)
    // fetchReqTypes(queryPamas)
  }, [])
  useEffect(() => {
    if (id !== 0) {
      setId(0)
    }
  }, [id])
  const handleCloseDrawer = async () => {
    await ReqForm.handleSubmit()
    onClose()
    setOnRefresh(true)
  }
  return (
    <>
      <Tooltip label='Crear Requerimiento'>
        <IconButton
          variant={'ghost'}
          fontSize='20px'
          icon={<BiPlus />}
          aria-label={''}
          bg={'gray.100'}
          onClick={onOpen}
        />
      </Tooltip>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Crear Requerimiento</DrawerHeader>

          <DrawerBody>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                void ReqForm.handleSubmit()
              }}
            >
              <VStack>
                <FormControl>
                  <FormLabel>Responsable</FormLabel>
                  {ReqForm.Field({
                    name: 'userId',
                    children: (field) => (
                      <Select
                        placeholder='Selecciona al responsable'
                        onChange={(e) =>
                          field.handleChange(Number(e.currentTarget.value))
                        }
                      >
                        {user.map((data) => (
                          <option
                            key={`select-form-id-${data.id}`}
                            value={data.id}
                          >
                            {data.userName}
                          </option>
                        ))}
                      </Select>
                    ),
                  })}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Titulo</FormLabel>
                  {ReqForm.Field({
                    name: 'title',
                    children: (field) => (
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    ),
                  })}
                </FormControl>
              </VStack>
            </form>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Button colorScheme='blue' onClick={handleCloseDrawer}>
                Crear
              </Button>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
