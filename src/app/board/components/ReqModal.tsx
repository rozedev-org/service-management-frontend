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
} from '@chakra-ui/react'
import { ReqTableOptions } from '../../requirements/components/TableOptions'
import { Requirement } from '../types/board.types'
import { useReqActions } from '@/app/requirements/hook/useRequirementActions'
import { BiChevronDown } from 'react-icons/bi'

export default function ReqModal(props: { requirement: Requirement }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { title, id, updatedAt, createdAt, user } = props.requirement
  const { reqActions, fetchReqActions, updateReqAction } = useReqActions(id)

  const handleOpen = async () => {
    await fetchReqActions()
    onOpen()
  }
  return (
    <>
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
        <Modal isOpen={isOpen} onClose={onClose} size={'4xl'} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
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
                <VStack display='flex' alignItems='start'>
                  <Stack w='100%' gap={'9px'}>
                    <HStack borderBottomWidth={2}>
                      <Text fontSize={'20px'} paddingBottom={'13px'}>
                        {title}
                      </Text>

                      <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                          {reqActions.current.title || 'Estado'}
                        </MenuButton>
                        <MenuList>
                          {reqActions.remaining.map((state) => (
                            <MenuItem
                              key={`menu-item-req-${id}-state-${state.id}`}
                              onClick={() => updateReqAction(state.id)}
                            >
                              {state.title}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </HStack>

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
                      <Avatar size={'md'} p='1' name={user.userName} />
                      <Text
                        size='md'
                        fontSize={'16px'}
                        fontWeight={400}
                        lineHeight={'24px'}
                      >
                        {user.userName}
                      </Text>
                    </HStack>
                  </Stack>
                </VStack>
              </CardContainer>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </>
  )
}
