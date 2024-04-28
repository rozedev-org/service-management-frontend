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
      borderRight={'1px'}
      borderColor={'gray.200'}
      borderStyle={'solid'}
      paddingY={8}
      paddingX={6}
      boxShadow={'rgba(112, 144, 176, 0.08) 14px 17px 40px 4px'}
      // bg={'white'}
      display={['none', 'none', 'flex']}
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
