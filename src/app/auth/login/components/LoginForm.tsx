'use client'
import { Link } from '@chakra-ui/next-js'
import {
  Stack,
  VStack,
  Icon,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Checkbox,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { BiBraille } from 'react-icons/bi'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useLoginForm } from '../hooks/useLogin'

export function LoginForm() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const { loginForm } = useLoginForm()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void loginForm.handleSubmit()
      }}
    >
      <Stack
        display={'flex'}
        minW={'20rem'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <VStack>
          <Stack alignItems={'center'}>
            <Icon as={BiBraille} boxSize={12} />
            <Text fontSize={'28px'} fontWeight={'bold'}>
              Entra a tu cuenta
            </Text>
            <Text fontSize={'14px'}>
              No tienes una cuenta?{' '}
              <Link color='teal.500' href={'#'}>
                Registrate
              </Link>
            </Text>
          </Stack>
          <Stack w={'350px'}>
            <FormControl>
              <FormLabel>Usuario</FormLabel>
              {loginForm.Field({
                name: 'username',
                children: (field) => (
                  <Input
                    type='text'
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                ),
              })}
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup size='md'>
                {loginForm.Field({
                  name: 'password',
                  children: (field) => (
                    <Input
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  ),
                })}

                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack alignItems={'center'}>
            <HStack gap={9}>
              <Checkbox>Recuerdame</Checkbox>
              <Link href={'#'}>He olvidado mi contraseña</Link>
            </HStack>
            <Button colorScheme='blue' type='submit' p={'20px 150px 20px'}>
              Entrar
            </Button>
          </Stack>
        </VStack>
      </Stack>
    </form>
  )
}
