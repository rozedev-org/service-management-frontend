import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import { useUser } from '../../hook/useUser'
import { useRouter } from 'next/navigation'
import { Link } from '@chakra-ui/next-js'
import ModalDelete from './ModalDelete'

interface ModalButtonsProps {
  handleAction: () => void
  title: string
  body: string
  buttonName: string
}

export default function ModalButtons({ params }: { params: { id: number } }) {
  const userQuery = useUser(params.id)
  const router = useRouter()
  const { isOpen, onClose } = useDisclosure()
  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:8000/api/service-manager-service/v1/users/${params.id}`
    )
    router.push('/users')
  }

  return (
    <>
      <Link href={`/users/${params.id}/update`}>
        <Button colorScheme='blue' margin='10px'>
          Actualizar
        </Button>
      </Link>
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
