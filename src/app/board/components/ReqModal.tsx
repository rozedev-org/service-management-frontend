/* eslint-disable react-hooks/exhaustive-deps */
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Stack,
  Avatar,
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { ReqTableOptions } from '../../requirements/components/TableOptions'
import { useReqActions } from '@/app/requirements/hook/useRequirementActions'
import { BiChevronDown } from 'react-icons/bi'
import { useRefreshSignal } from '../states/useRefreshSignal'
import { RequirementsEntity } from '@/app/requirements/types/req.types'
import { useUpdateReqForm } from '@/app/requirements/hook/useRequirements'
import { useUsers } from '@/app/users/hook/useUser'
import { useEffect, useState } from 'react'
import { PaginationParams } from '@/common/interfaces/response.interface'
import { UserEntity } from '@/app/users/types/user.types'
import { UpDownIcon } from '@chakra-ui/icons'

export default function ReqModal(props: { requirement: RequirementsEntity }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { title, id, updatedAt, createdAt, user } = props.requirement
  const { reqActions, fetchReqActions, updateReqAction } = useReqActions(id)
  const { setOnRefresh } = useRefreshSignal()
  const { updateReqForm } = useUpdateReqForm(props.requirement)
  const { user: usersData, fetchUsers } = useUsers()
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(user)
  const handleOpen = async () => {
    await fetchReqActions()
    onOpen()
  }
  const handleUpdateAction = async (id: number) => {
    await updateReqAction(id)
  }
  const handleUpdateUser = async () => {
    await updateReqForm.handleSubmit()
  }
  const handleMenuItemClick = (user: UserEntity) => {
    setSelectedUser(user)
  }
  const handleCloseModal = async () => {
    onClose()
    setOnRefresh(true)
  }
  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
    }
    fetchUsers(queryPamas)
  }, [])

  return (
    <>
      {/* Boton con un titulo que se renderiza en la columna */}
      <Button
        colorScheme='gray'
        variant={'link'}
        onClick={handleOpen}
        fontSize={14}
        color={'black'}
        textAlign={'left'}
      >
        {title}
      </Button>
      <Stack>
        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          size={'4xl'}
          isCentered
        >
          <ModalOverlay />
          {/* Contenido del modal */}
          <ModalContent>
            <ModalBody>
              {/* Container con el menu desplegable de opciones, titulo y fecha */}
              <CardContainer
                title={`Detalle del Requerimiento ${id}`}
                optionsButton={<ReqTableOptions id={id} />}
                aditionalHeaderItems={
                  <Stack
                    display='flex'
                    marginLeft={'auto'}
                    alignItems='end'
                    opacity='65%'
                  >
                    <Text>
                      Fecha de Creacion: {new Date(createdAt).toLocaleString()}
                    </Text>
                    <Text>
                      Fecha de Actualizacion:{' '}
                      {new Date(updatedAt).toLocaleString()}
                    </Text>
                  </Stack>
                }
              >
                {/* Todo el cuerpo del modal */}
                <VStack display='flex' alignItems='start'>
                  <Stack w='100%' gap={'9px'}>
                    <HStack borderBottomWidth={2}>
                      <Text fontSize={'20px'} paddingBottom={'13px'}>
                        {title}
                      </Text>
                      <Menu>
                        {/* Menu que controla los estados del requerimiento */}
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                          {reqActions.current.title || 'Estado'}
                        </MenuButton>
                        <MenuList>
                          {reqActions.remaining.map((state) => (
                            <MenuItem
                              key={`menu-item-req-${id}-state-${state.id}`}
                              onClick={async () =>
                                await handleUpdateAction(state.id)
                              }
                            >
                              {state.title}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </HStack>
                    {/* Titulo del requerimiento */}
                    <HStack minH={'104px'} alignItems={'start'}>
                      <Text
                        fontSize={'16px'}
                        fontWeight={700}
                        lineHeight={'24px'}
                      >
                        Descripcion:{' '}
                      </Text>
                      <Text
                        fontSize={'16px'}
                        fontWeight={400}
                        lineHeight={'24px'}
                      >
                        {title}
                      </Text>
                    </HStack>
                  </Stack>
                  {/* Responsable del requerimiento */}
                  <Stack w='100%' gap={'9px'}>
                    <Text
                      paddingBottom={'13px'}
                      borderBottomWidth={2}
                      fontSize={'20px'}
                      fontWeight={400}
                      lineHeight={'24px'}
                    >
                      Responsable
                    </Text>
                    <HStack>
                      <FormControl isRequired>
                        {updateReqForm.Field({
                          name: 'userId',
                          children: (field) => (
                            <HStack>
                              <Avatar
                                size={'md'}
                                p='1'
                                name={selectedUser?.userName}
                              />
                              <Menu>
                                {/* Menu que controla el responsable */}
                                <MenuButton
                                  as={Button}
                                  rightIcon={<UpDownIcon />}
                                >
                                  {selectedUser?.userName}
                                </MenuButton>
                                <MenuList>
                                  {usersData.map((data) => (
                                    <MenuItem
                                      value={data.id}
                                      key={`menu-item-req-${id}-state-${data.id}`}
                                      onClick={(e) => {
                                        field.handleChange(
                                          Number(e.currentTarget.value)
                                        )
                                        handleUpdateUser()
                                        handleMenuItemClick(data)
                                      }}
                                    >
                                      {data.userName}
                                    </MenuItem>
                                  ))}
                                </MenuList>
                              </Menu>
                            </HStack>
                          ),
                        })}
                      </FormControl>
                    </HStack>
                  </Stack>
                </VStack>
              </CardContainer>
            </ModalBody>
            <ModalFooter>
              {/* Boton para cerrar el modal */}
              <Button colorScheme='blue' mr={3} onClick={handleCloseModal}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </>
  )
}
