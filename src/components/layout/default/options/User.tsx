import { VStack, Button } from '@chakra-ui/react'
import {
  BiSolidDashboard,
  BiSolidPieChartAlt2,
  BiFileBlank,
  BiHistory,
  BiBookmark,
} from 'react-icons/bi'

export const UserOptions = () => {
  return (
    <VStack w={'full'} gap={1}>
      <Button
        color={'gray.600'}
        justifyContent={'start'}
        w={'full'}
        leftIcon={<BiSolidDashboard />}
        variant='ghost'
      >
        Dashboard
      </Button>

      <Button
        color={'gray.600'}
        justifyContent={'start'}
        w={'full'}
        leftIcon={<BiSolidPieChartAlt2 />}
        variant='ghost'
      >
        Analysis
      </Button>

      <Button
        color={'gray.600'}
        justifyContent={'start'}
        w={'full'}
        leftIcon={<BiFileBlank />}
        variant='ghost'
      >
        Documents
      </Button>

      <Button
        color={'gray.600'}
        justifyContent={'start'}
        w={'full'}
        leftIcon={<BiHistory />}
        variant='ghost'
      >
        History
      </Button>

      <Button
        color={'gray.600'}
        justifyContent={'start'}
        w={'full'}
        leftIcon={<BiBookmark />}
        variant='ghost'
      >
        Favorites
      </Button>
    </VStack>
  )
}
