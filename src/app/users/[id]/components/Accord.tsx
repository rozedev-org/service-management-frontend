/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  Stack,
  Text,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useUserReqDetail } from '../../hook/useUser'
import { UserEntity } from '../../types/user.types'
import ReqAccordPanel from './AccordPanel'

export function RequirementsAccord({
  params,
}: {
  params: { id: number; user: UserEntity }
}) {
  const id = params.id
  const { fetchBoard, userDetail, isLoading } = useUserReqDetail(id)

  useEffect(() => {
    fetchBoard()
  }, [])

  return (
    <Stack
      display={'flex'}
      mr={'auto'}
      w={'100%'}
      maxH={'220px'}
      overflowY={'auto'}
    >
      {isLoading && (
        <Center pb={2}>
          <Spinner />
        </Center>
      )}
      {userDetail.map((detail) => (
        <>
          <Accordion
            defaultIndex={[1]}
            allowMultiple
            key={`accord-id-${detail.id}`}
          >
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  {detail.title}
                </Box>
                <Text>{detail.requirement.length}</Text>
                <AccordionIcon />
              </AccordionButton>
              <>
                {detail.requirement.map((req) => (
                  <>
                    <ReqAccordPanel req={req} user={params.user} />
                  </>
                ))}
              </>
            </AccordionItem>
          </Accordion>
        </>
      ))}
    </Stack>
  )
}
