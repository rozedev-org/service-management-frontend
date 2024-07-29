import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useReqTypeUpdateForm } from '../../hook/useRequirementsTypes'

interface ModalButtonsProps {
  handleAction: () => void
  buttonEnable?: boolean
  buttonLoading?: boolean
}

export const ReqTypeModaleUpdate = (props: ModalButtonsProps) => {
  const { loading } = useReqTypeUpdateForm()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const handleConfirm = () => {
    props.handleAction()
    if (!loading) {
      onClose()
    }
  }
  return (
    <>
      <Button onClick={onOpen} isDisabled={props.buttonEnable}>
        Actualizar
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actualizacion de Tipo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Confirme la actualizacion</ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme='gray' onClick={handleConfirm}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
