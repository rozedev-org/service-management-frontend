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

interface ModalButtonsProps {
  handleAction: () => void
  show?: boolean
}

export default function ModalButtons(props: ModalButtonsProps) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Button
        colorScheme='blue'
        margin='10px'
        onClick={onOpen}
        isDisabled={props.show}
      >
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
          <ModalHeader>Actualizacion del Requerimiento</ModalHeader>
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
