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
  Center,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BiBraille } from 'react-icons/bi'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useLoginForm } from '../hooks/useLogin'
import { LoadItem } from '@/components/layout/default/Loading '

export function LoginForm() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const { loginForm, onError, setOnError, loading } = useLoginForm()
  const handleSubmit = () => {
    loginForm.handleSubmit()
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        loginForm.handleSubmit()
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
            <FormControl isInvalid={!!loginForm.errors.username}>
              <FormLabel>Usuario</FormLabel>
              <Input
                id='username'
                name='username'
                type='text'
                onChange={loginForm.handleChange}
                value={loginForm.values.username}
              />
            </FormControl>

            <FormControl isInvalid={!!loginForm.errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup size='md'>
                <Input
                  id='password'
                  name='password'
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  onChange={(e) => {
                    setOnError(false)
                    loginForm.handleChange(e)
                  }}
                  value={loginForm.values.password}
                />

                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* <FormControl>
              <FormLabel>Usuario</FormLabel>
              {loginForm.Field({
                name: 'username',
                children: (field) => (
                  <Input
                    type='text'
                    onChange={(e) => {
                      setOnError(false)
                      field.handleChange(e.target.value)
                    }}
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
                      onChange={(e) => {
                        setOnError(false)
                        field.handleChange(e.target.value)
                      }}
                    />
                  ),
                })}

                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl> */}
          </Stack>
          <Stack alignItems={'center'}>
            <HStack gap={9}>
              <Checkbox>Recuerdame</Checkbox>
              <Link href={'#'}>He olvidado mi contraseña</Link>
            </HStack>
            <Center w={'90%'}>
              {onError && (
                <Text color={'red'}>Datos incorrectos, intentelo de nuevo</Text>
              )}
            </Center>
            <Button
              colorScheme='blue'
              onClick={handleSubmit}
              p={'20px 150px 20px'}
            >
              Entrar
            </Button>
          </Stack>
        </VStack>
      </Stack>
      {loading && <LoadItem />}
    </form>
  )
}
