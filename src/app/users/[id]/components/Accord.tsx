/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  Stack,
  Text,
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
  const { fetchBoard, userDetail } = useUserReqDetail(id)

  useEffect(() => {
    fetchBoard()
  }, [])

  return (
    <>
      <Stack
        display={'flex'}
        mr={'auto'}
        w={'100%'}
        maxH={'220px'}
        overflowY={'auto'}
      >
        {userDetail.map((detail) => (
          <>
            <Accordion
              defaultIndex={[1]}
              allowMultiple
              key={`accord-id-${detail.id}`}
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      {detail.title}
                    </Box>
                    <Text>{detail.Requirement.length}</Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <>
                    {detail.Requirement.map((req) => (
                      <>
                        <ReqAccordPanel req={req} user={params.user} />
                      </>
                    ))}
                  </>
                </h2>
              </AccordionItem>
            </Accordion>
          </>
        ))}
      </Stack>
    </>
  )
}
