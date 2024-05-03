/* eslint-disable react-hooks/exhaustive-deps */
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
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { useRequirementType } from '../../hook/useRequirementsTypes'

export const ReqTypeModalDelete = ({ params }: { params: { id: number } }) => {
  const { reqType, fetchReqType } = useRequirementType(params.id)
  const router = useRouter()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleDelete = async () => {
    await axiosInstace.delete(`/requirements/type/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
      },
    })
    router.push(appRoutes.home.requirements.reqTypes.url(0))
  }

  useEffect(() => {
    fetchReqType()
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
          <ModalHeader>Eliminacion del Tipo {`"${reqType?.name}"`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Confirme la actualizacion</ModalBody>
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
