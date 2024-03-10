import { VStack, Button } from "@chakra-ui/react"
import { BiHelpCircle, BiCog } from "react-icons/bi"

export const ManagementOptions = () => {
  return (
    <VStack w={'full'} gap={1}>
      <Button
        color={'gray.600'}
        justifyContent={'start'}
        w={'full'}
        leftIcon={<BiHelpCircle />}
        variant='ghost'
      >
        Help Center
      </Button>

      <Button
        color={'gray.600'}
        justifyContent={'start'}
        w={'full'}
        leftIcon={<BiCog />}
        variant='ghost'
      >
        Setting
      </Button>
    </VStack>
  )
}
