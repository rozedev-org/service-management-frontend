import { appRoutes } from '@/appRoutes'
import { Link } from '@chakra-ui/next-js'
import { VStack, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { BiHelpCircle, BiCog } from 'react-icons/bi'

export const ManagementOptions = () => {
  const router = useRouter()
  return (
    <VStack w={'full'} gap={1} alignItems={'flex-start'}>
      <Button
        color={'gray.600'}
        justifyContent={'start'}
        w={'full'}
        leftIcon={<BiHelpCircle />}
        variant='ghost'
      >
        Help Center
      </Button>

      <Link href={appRoutes.home.settings.url(0)}>
        <Button
          color={'gray.600'}
          justifyContent={'start'}
          w={'full'}
          leftIcon={<BiCog />}
          variant='ghost'
        >
          Configuraciones
        </Button>
      </Link>
    </VStack>
  )
}
