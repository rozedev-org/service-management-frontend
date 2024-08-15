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
  Editable,
  EditableInput,
  EditablePreview,
  Box,
} from '@chakra-ui/react'
import { ReqTableOptions } from '../../requirements/components/TableOptions'
import { useReqActions } from '@/app/requirements/hook/useRequirementActions'
import { BiChevronDown } from 'react-icons/bi'
import { useRefreshSignal } from '../states/useRefreshSignal'
import {
  useRequirement,
  useUpdateReqForm,
} from '@/app/requirements/hook/useRequirements'
import { useUsers } from '@/app/users/hook/useUser'
import { useEffect, useState } from 'react'
import { PaginationParams } from '@/common/interfaces/response.interface'
import { UserEntity } from '@/app/users/types/user.types'
import { UpDownIcon } from '@chakra-ui/icons'
import { RequirementEntity } from '@/app/requirements/types/requirements.types'
import ModalUpdateReq from '@/app/requirements/[id]/components/ModalUpdateReq'

export default function ReqModal(props: { requirement: RequirementEntity }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id, updatedAt, createdAt, user } = props.requirement
  const { reqActions, fetchReqActions, updateReqAction } = useReqActions(id)
  const { setOnRefresh } = useRefreshSignal()
  const { user: usersData, fetchUsers } = useUsers()
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(user)
  const { requirement, fetchReq } = useRequirement(id)
  const { updateReqForm } = useUpdateReqForm(requirement)
  const [edited, setEdited] = useState(false)
  const handleOpen = async () => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
    }
    fetchUsers(queryPamas)
    fetchReq()
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
  const handleUpdate = async () => {
    await updateReqForm.handleSubmit()
    handleCloseModal()
  }

  useEffect(() => {}, [])

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
        _hover={{ textDecoration: 'none' }}
      >
        <Box w={['10rem', '19rem']} pr={2}>
          <HStack
            key={`home-key-${id}`}
            bg='#FFFFFF'
            borderRadius='20px'
            p={2}
            minH={['3.5rem', '56px']}
            _hover={{ bg: '#c1c1c1' }}
          >
            <Avatar name={user?.userName || ''} w={'30px'} h={'30px'} />
            <Box textOverflow={'ellipsis'} overflow={'hidden'}>
              Averia #{id}
            </Box>
            <Text fontSize={10} ml={'auto'}>
              REQ-{id}
            </Text>
          </HStack>
        </Box>
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
                <VStack display='flex' alignItems='center'>
                  <Stack w='100%' gap={'9px'}>
                    <HStack borderBottomWidth={2} pb={2}>
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
                  {/* Stack De los Tipos de Requerimiento */}
                  <Stack w={'100%'}>
                    <Text>Detalle</Text>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        void updateReqForm.handleSubmit()
                      }}
                    >
                      <VStack>
                        <FormControl>
                          <updateReqForm.Field
                            name='requirementFieldValue'
                            mode='array'
                          >
                            {(field) => {
                              return (
                                <>
                                  {field.state.value.map((_, i) => {
                                    return (
                                      <updateReqForm.Field
                                        key={i}
                                        name={`requirementFieldValue[${i}].value`}
                                      >
                                        {(subField) => {
                                          return (
                                            <HStack
                                              p={2}
                                              borderRadius={'5px'}
                                              alignItems={'flex-start'}
                                            >
                                              <Text
                                                whiteSpace={'nowrap'}
                                                w={'100%'}
                                                fontSize={18}
                                                fontWeight={450}
                                              >
                                                {
                                                  requirement
                                                    ?.requirementFieldValue[i]
                                                    .requirementTypeField.title
                                                }
                                              </Text>
                                              <Editable
                                                border={'solid'}
                                                borderWidth={1}
                                                borderTop={'none'}
                                                borderLeft={'none'}
                                                borderRight={'none'}
                                                borderColor={'gray.100'}
                                                w={'100%'}
                                                defaultValue={
                                                  requirement
                                                    ?.requirementFieldValue[i]
                                                    .value
                                                }
                                                onBlur={subField.handleBlur}
                                                onChange={() => {
                                                  setEdited(true)
                                                }}
                                              >
                                                <EditablePreview />
                                                <EditableInput
                                                  onChange={(e) =>
                                                    subField.handleChange(
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                              </Editable>
                                            </HStack>
                                          )
                                        }}
                                      </updateReqForm.Field>
                                    )
                                  })}
                                </>
                              )
                            }}
                          </updateReqForm.Field>
                        </FormControl>
                      </VStack>
                    </form>
                    {edited === true ? (
                      <ModalUpdateReq handleAction={handleUpdate} />
                    ) : null}
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
