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

interface ModalButtonsProps {
  handleAction: () => void
}

export const ReqTypeModaleUpdate = (props: ModalButtonsProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Actualizar</Button>
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
            <Button colorScheme='gray' onClick={props.handleAction}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
