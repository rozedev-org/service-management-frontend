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
import React, { useState } from 'react'
import { BiBraille } from 'react-icons/bi'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { config } from '@/config'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { appRoutes } from '@/appRoutes'

export function LoginForm() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = handleSubmit(async (data) => {
    const response = await axios.post(`${config.bff.url}/auth/login`, {
      username: data.username,
      password: data.password,
    })

    localStorage.setItem('token', response.data.token)
    router.push(appRoutes.home.url(0))
    // console.log(data)

    // const res = await signIn('credentials', {
    //   username: data.username,
    //   password: data.password,
    //   redirect: false,
    // })

    // if (res?.error) {
    //   setError(res.error)
    // } else {
    //   router.push('/')
    //   router.refresh()
    // }
  })

  return (
    <form onSubmit={onSubmit}>
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
              <Input
                type='text'
                {...register('username', {
                  required: {
                    value: true,
                    message: 'username is required',
                  },
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  })}
                />
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
