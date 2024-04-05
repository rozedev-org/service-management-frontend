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
} from '@chakra-ui/react'
import { ReqTableOptions } from '../requirements/components/TableOptions'
import { ReqCardProps } from '../types/reqCard.types'
import { Link } from '@chakra-ui/next-js'

export default function ReqModal({
  title,
  id,
  username,
  createdAt,
  updatedAt,
}: ReqCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Link onClick={onOpen} fontSize={14} href='#'>
        {title}
      </Link>
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
                    <Text
                      borderBottomWidth={2}
                      fontSize={'20px'}
                      paddingBottom={'13px'}
                    >
                      Realizar servicio tecnico
                    </Text>
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
                      <Avatar size={'md'} p='1' name={username} />
                      <Text
                        size='md'
                        fontSize={'16px'}
                        fontWeight={400}
                        lineHeight={'24px'}
                      >
                        {username}
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
