import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '../../hook/useUser'
import { config } from '@/config'
import { appRoutes } from '@/appRoutes'

export default function ModalButtons({ params }: { params: { id: number } }) {
  const userQuery = useUser(params.id)
  const router = useRouter()
  const { onOpen, isOpen, onClose } = useDisclosure()
  const handleDelete = async () => {
    await axios.delete(`${config.bff.url}/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
      },
    })
    router.push(appRoutes.home.users.url())
  }

  return (
    <>
      <Button colorScheme='red' margin='10px' onClick={onOpen}>
        Eliminar
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Eliminacion del Usuario : {userQuery.data?.userName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Confirmacion de Eliminacion</ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme='red' onClick={handleDelete}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
