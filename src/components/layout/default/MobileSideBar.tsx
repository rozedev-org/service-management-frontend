'use client'
import { SearchInput } from '@/components/input/SearchInput'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { BiBraille } from 'react-icons/bi'
import { UserOptions } from './options/UserOptions'
import { ManagementOptions } from './options/ManagementOptions'
import { Profile } from './Profile'

export const MobileSideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [optionFilter, setOptionFilter] = useState('')

  const handleOnChangeOptionFilter = (value: string) => {
    setOptionFilter(value)
  }
  return (
    <>
      <HStack
        display={['flex', 'flex', 'none']}
        p={'6'}
        w={'100%'}
        boxShadow={'rgba(112, 144, 176, 0.08) 14px 17px 40px 4px'}
      >
        <HStack>
          <Icon as={BiBraille} boxSize={6} />
          <Text fontWeight={'500'}>Service Management</Text>
        </HStack>

        <IconButton
          ml={'auto'}
          aria-label='options button'
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
      </HStack>

      <Drawer isOpen={isOpen} size={'full'} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={'#f4f7fe'}>
          <DrawerCloseButton marginTop={'8px'} />
          <DrawerHeader
            boxShadow={'rgba(112, 144, 176, 0.08) 14px 17px 40px 4px'}
          >
            <HStack>
              <Icon as={BiBraille} boxSize={6} />
              <Text fontWeight={'500'}>Service Management</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack h={'100%'} alignItems={'flex-start'}>
              {/* Top Section */}
              <VStack gap={8} alignItems={'flex-start'}>
                {/* Search Input */}
                <SearchInput onChangeHandler={handleOnChangeOptionFilter} />

                <UserOptions optionFilter={optionFilter} onClose={onClose} />
              </VStack>
              {/* Bot Section */}
              {/* Management Options */}
              <VStack w={'full'} marginTop={'auto'} alignItems={'flex-start'}>
                <Divider />

                <ManagementOptions onClose={onClose} />

                <Divider />

                <Profile onClose={onClose} />
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
