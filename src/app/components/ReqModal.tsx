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
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <CardContainer
                title={`Detalle del Requerimiento ${id}`}
                optionsButton={<ReqTableOptions id={id} />}
              >
                <Stack display='flex' alignItems='end' opacity='65%'>
                  <Text>Fecha de Creacion: {JSON.stringify(createdAt)}</Text>
                  <Text>
                    Fecha de Actualizacion: {JSON.stringify(updatedAt)}
                  </Text>
                </Stack>
                <VStack display='flex' alignItems='start'>
                  <Stack w='100%'>
                    <Text borderBottomWidth={2}>Realizar servicio tecnico</Text>
                    <Text>Descripcion: {title} </Text>
                  </Stack>
                  <Stack w='100%' paddingTop={20}>
                    <Text borderBottomWidth={2}>Responsable</Text>
                    <HStack>
                      <Avatar size={'md'} p='1' name={username} />
                      <Text size='md'>{username}</Text>
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
