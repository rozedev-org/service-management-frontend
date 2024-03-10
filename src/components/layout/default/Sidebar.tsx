'use client'
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  BiBookmark,
  BiBraille,
  BiCog,
  BiDotsVerticalRounded,
  BiFileBlank,
  BiHelpCircle,
  BiHistory,
  BiSearch,
  BiSolidDashboard,
  BiSolidPieChartAlt2,
} from 'react-icons/bi'
import { Profile } from './Profile'
import { ManagementOptions } from './options/Management'
import { UserOptions } from './options/User'
import { SearchInput } from '@/components/input/SearchInput'
export const Sidebar = () => {
  return (
    <VStack
      minH={'100vh'}
      maxW={'xs'}
      borderRight={'1px'}
      borderColor={'gray.200'}
      borderStyle={'solid'}
      paddingY={8}
      paddingX={6}
    >
      {/* Top Section */}
      <VStack gap={8} alignItems={'start'}>
        {/* APP Icon */}
        <HStack>
          <Icon as={BiBraille} boxSize={6} />
          <Text fontWeight={'500'}>Service Management</Text>
        </HStack>

        {/* Search Input */}
        <SearchInput />

        {/* User Options */}

        <UserOptions />
      </VStack>
      {/* Bot Section */}

      {/* Management Options */}
      <VStack w={'full'} marginTop={'auto'}>
        <Divider />

        <ManagementOptions />

        <Divider />

        <Profile />
      </VStack>
    </VStack>
  )
}
