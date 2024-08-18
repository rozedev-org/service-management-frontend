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
import React, { useEffect } from 'react'
import { useProfile } from '../../hooks/useProfile'
import { useRouter } from 'next/navigation'
import { appRoutes } from '@/appRoutes'
import { axiosInstace } from '@/common/utils/axiosIntance'

export default function ProfileModalDelete({
  params,
}: {
  params: { id: number }
}) {
  const { profile, fetchProfile } = useProfile()
  const router = useRouter()
  const { onOpen, isOpen, onClose } = useDisclosure()

  const handleDelete = async () => {
    await axiosInstace.delete(`/profiles/${params.id}`, {})
    router.push(appRoutes.home.users.profile.url(0))
  }

  useEffect(() => {
    fetchProfile(params.id)
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
          <ModalHeader>Eliminacion del Usuario : {profile?.name}</ModalHeader>
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
