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
import { useRequirementState } from '../../hook/useRequirementState'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { useEffect } from 'react'
import { axiosInstace } from '@/common/utils/axiosIntance'

function ReqStateModalDelete({ params }: { params: { id: number } }) {
  const { reqState, fetchReqState } = useRequirementState(params.id)
  const router = useRouter()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleDelete = async () => {
    await axiosInstace.delete(`/requirements/state/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
      },
    })
    router.push(appRoutes.home.settings.reqState.url(0))
  }

  useEffect(() => {
    fetchReqState()
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
          <ModalHeader>
            Eliminacion del Estado {`"${reqState.title}"`}
          </ModalHeader>
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

export default ReqStateModalDelete
