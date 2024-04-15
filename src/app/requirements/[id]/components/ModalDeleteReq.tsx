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
import { useRequirement } from '../../hook/useRequirements'
import { config } from '@/config'
import { appRoutes } from '@/appRoutes'
import { axiosInstace } from '@/common/utils/axiosIntance'

export default function ModalButtons({ params }: { params: { id: number } }) {
  const requirementsQuery = useRequirement(params.id)
  const router = useRouter()
  const { onOpen, isOpen, onClose } = useDisclosure()
  const handleDelete = async () => {
    await axiosInstace.delete(`/requirements/${params.id}`, {})
    router.push(appRoutes.home.requirements.url())
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
            Eliminacion del requerimiento : {requirementsQuery.data?.title}
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
