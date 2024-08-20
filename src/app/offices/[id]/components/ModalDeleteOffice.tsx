/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { axiosInstace } from '@/common/utils/axiosIntance'
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
import { useOffice } from '../../hook/useOffice'

export default function ModalDeleteOffice({
  params,
}: {
  params: { id: number }
}) {
  const { fetchoffice, office } = useOffice(params.id)
  const router = useRouter()
  const { onOpen, isOpen, onClose } = useDisclosure()

  const handleDelete = async () => {
    await axiosInstace.delete(`/locations/offices/${params.id}`, {})
    router.push(appRoutes.home.offices.url())
  }

  useEffect(() => {
    fetchoffice()
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
          <ModalHeader>Eliminacion de la sucursal : {office.name}</ModalHeader>
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
