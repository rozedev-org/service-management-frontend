'use client'
import {
  Divider,
  HStack,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { BiBraille } from 'react-icons/bi'
import { Profile } from './Profile'
import { ManagementOptions } from './options/ManagementOptions'
import { UserOptions } from './options/UserOptions'
import { SearchInput } from '@/components/input/SearchInput'
import { useState } from 'react'
import { GlobalStyles } from '@/constants/Colors'

export const Sidebar = () => {
  const [optionFilter, setOptionFilter] = useState('')
  const { onClose } = useDisclosure()
  const handleOnChangeOptionFilter = (value: string) => {
    setOptionFilter(value)
  }

  return (
    <VStack
      minH={'100vh'}
      maxW={'xs'}
      paddingY={8}
      paddingX={6}
      boxShadow={GlobalStyles().BOX_SHADOW}
      display={['none', 'none', 'flex']}
      bg={GlobalStyles().BG_COLOR_PRIMARY}
    >
      {/* Top Section */}
      <VStack gap={8} alignItems={'start'}>
        {/* APP Icon */}
        <HStack>
          <Icon as={BiBraille} boxSize={6} />
          <Text fontWeight={'500'}>Service Management</Text>
        </HStack>

        {/* Search Input */}
        <SearchInput onChangeHandler={handleOnChangeOptionFilter} />

        {/* User Options */}
        <UserOptions optionFilter={optionFilter} onClose={onClose} />
      </VStack>

      {/* Bot Section */}
      {/* Management Options */}
      <VStack w={'full'} marginTop={'auto'} alignItems={'flex-start'}>
        <Divider />

        <ManagementOptions />

        <Divider />

        <Profile />
      </VStack>
    </VStack>
  )
}
