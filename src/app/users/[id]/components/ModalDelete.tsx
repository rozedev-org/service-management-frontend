/* eslint-disable react-hooks/exhaustive-deps */
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
import { useRouter } from 'next/navigation'
import { useUser } from '../../hook/useUser'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'
import { axiosInstace } from '@/common/utils/axiosIntance'

export default function ModalButtons({ params }: { params: { id: number } }) {
  const { user, fetchUser } = useUser(params.id)
  const router = useRouter()
  const { onOpen, isOpen, onClose } = useDisclosure()

  const handleDelete = async () => {
    await axiosInstace.delete(`/users/${params.id}`, {})
    router.push(appRoutes.home.users.url())
  }

  useEffect(() => {
    fetchUser()
  }, [])

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
          <ModalHeader>Eliminacion del Usuario : {user.userName}</ModalHeader>
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
