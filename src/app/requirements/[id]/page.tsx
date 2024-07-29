/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  Text,
  Avatar,
  VStack,
  Stack,
  HStack,
  FormControl,
  FormLabel,
  Editable,
  EditableInput,
  EditablePreview,
  Button,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import {
  useCreateReqForm,
  useRequirement,
  useUpdateReqForm,
} from '../hook/useRequirements'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { ReqTableOptions } from '../components/TableOptions'
import { useEffect, useState } from 'react'
import ModalUpdateReq from './components/ModalUpdateReq'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { format } from 'date-fns'
import { useUsers } from '@/app/users/hook/useUser'
import { PaginationParams } from '@/common/interfaces/response.interface'
import { UpDownIcon } from '@chakra-ui/icons'
import { UserEntity } from '@/app/users/types/user.types'

export default function ReqPage({ params }: { params: { id: number } }) {
  const { requirement, fetchReq, isLoading } = useRequirement(params.id)
  const { updateReqForm } = useUpdateReqForm(requirement)
  const { user: usersData, fetchUsers } = useUsers()
  const [edited, setEdited] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null)
  const router = useRouter()
  const handleUpdate = async () => {
    await updateReqForm.handleSubmit()
    router.push(appRoutes.home.requirements.url())
  }
  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
      getAll: true,
    }
    fetchUsers(queryPamas)
    fetchReq()
  }, [])
  useEffect(() => {
    {
      requirement && setSelectedUser(requirement.user)
    }
  }, [isLoading])
  const handleMenuItemClick = (user: UserEntity) => {
    setSelectedUser(user)
  }
  const handleUpdateUser = async () => {
    await updateReqForm.handleSubmit()
  }

  return (
    <CardContainer
      isLoading={isLoading}
      title={`Detalle del Requerimiento ${params.id}`}
      optionsButton={<ReqTableOptions id={params.id} />}
    >
      <Stack display='flex' alignItems='end' opacity='65%'>
        <Text>
          Fecha de Creacion:{' '}
          {new Date(requirement?.createdAt || '').toLocaleString()}
        </Text>
        <Text>
          Fecha de Actualizacion:{' '}
          {new Date(requirement?.updatedAt || '').toLocaleString()}
        </Text>
      </Stack>
      <VStack display='flex' alignItems='start'>
        <Stack w='100%'>
          {updateReqForm.Field({
            name: 'title',
            children: (field) => (
              <HStack w={'100%'}>
                <Text fontSize={'16px'} fontWeight={700} lineHeight={'24px'}>
                  Descripcion:
                </Text>
                <Editable
                  w={'100%'}
                  defaultValue={requirement?.title}
                  onBlur={field.handleBlur}
                  onChange={() => {
                    setEdited(true)
                  }}
                >
                  <EditablePreview />
                  <EditableInput
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Editable>
              </HStack>
            ),
          })}
        </Stack>
        <Stack w='100%' paddingTop={20}>
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
                    <Avatar size={'md'} p='1' name={selectedUser?.userName} />
                    <Menu>
                      {/* Menu que controla el responsable */}
                      <MenuButton as={Button} rightIcon={<UpDownIcon />}>
                        {selectedUser?.userName}
                      </MenuButton>
                      <MenuList>
                        {usersData.map((data) => (
                          <MenuItem
                            value={data.id}
                            key={`menu-item-req-${data.id}`}
                            onClick={(e) => {
                              field.handleChange(Number(e.currentTarget.value))
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
        <Stack w='100%' paddingTop={10}>
          <Text>Detalle</Text>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              void updateReqForm.handleSubmit()
            }}
          >
            <VStack overflow={'scroll'} h={'200px'}>
              <FormControl>
                <updateReqForm.Field name='requirementFieldValue' mode='array'>
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
                                const dateValueFormated =
                                  requirement?.requirementFieldValue[i]
                                    .requirementTypeField.type === 'date'
                                    ? format(
                                        requirement.requirementFieldValue[i]
                                          .value,
                                        'dd/MM/yyyy hh:mm a'
                                      )
                                    : requirement?.requirementFieldValue[i]
                                        .value
                                return (
                                  <Stack
                                    borderWidth={'3px'}
                                    borderColor={'gray.200'}
                                    p={4}
                                    spacing={4}
                                    borderRadius={'5px'}
                                  >
                                    <FormLabel>
                                      <Text>
                                        {
                                          requirement?.requirementFieldValue[i]
                                            .requirementTypeField.title
                                        }
                                      </Text>
                                    </FormLabel>
                                    <Stack
                                      borderRadius={'5px'}
                                      _hover={{ bg: '#edf0f9' }}
                                    >
                                      <Editable
                                        defaultValue={dateValueFormated}
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
                                    </Stack>
                                  </Stack>
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
          <ModalUpdateReq handleAction={handleUpdate} show={!edited} />
          {/* {edited === true ? (
            <ModalUpdateReq handleAction={handleUpdate} />
          ) : null} */}
        </Stack>
      </VStack>
    </CardContainer>
  )
}
