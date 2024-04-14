'use client'
import { appRoutes } from '@/appRoutes'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { Link } from '@chakra-ui/next-js'
import { Button, Icon, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function SettingsPage() {
  return (
    <CardContainer title='Configuraciones'>
      <Link href={appRoutes.home.settings.reqState.url(0)}>
        <Button w={'100%'} h={'10%'}>
          <Text mr={'auto'}>
            <ChevronRightIcon />
            Flujo de Requerimientos
          </Text>
        </Button>
      </Link>
    </CardContainer>
  )
}
