/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Stack,
  Button,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ReqCard from '@/app/board/components/ReqCard'
import { useDroppable } from '@dnd-kit/core'
import { useBoard } from '@/app/board/hook/useBoard'
import { RequirementsEntity } from '@/app/requirements/types/req.types'

function Accord({ params }: { params: { id: number } }) {
  const id = params.id
  const { setNodeRef } = useDroppable({
    id,
  })
  const [reqs, setReqs] = useState<RequirementsEntity[]>([])
  const [numTotalReq, setNumTotalReq] = useState(0)
  const { boardState } = useBoard()
  const handleReqUser = () => {
    if (boardState) {
      const filteredReqs: RequirementsEntity[] = []
      boardState.forEach((board) => {
        board.Requirement.forEach((req) => {
          if (req.userId == params.id) {
            filteredReqs.push(req)
          }
        })
      })
      setReqs(filteredReqs)
    }
  }

  useEffect(() => {
    if (boardState.length !== 0) {
      handleReqUser()
    }
  }, [boardState, id])

  return (
    <>
      <Button onClick={handleReqUser}>get data</Button>

      <Stack
        display={'flex'}
        mr={'auto'}
        w={'100%'}
        maxH={'220px'}
        overflowY={'auto'}
      >
        <>
          {boardState.map((query) => (
            <>
              <Accordion
                defaultIndex={[1]}
                allowMultiple
                key={`accord-id-${query.id}`}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        {query.title}
                      </Box>
                      <Text>{numTotalReq}</Text>
                      <AccordionIcon />
                    </AccordionButton>
                    {reqs.map((req) => {
                      const reqStateId = req.stateId
                      const secuenceId = query.id
                      const reqUserId = req.userId
                      const userId = req.user?.id
                      if (reqStateId == secuenceId && reqUserId == userId) {
                        return (
                          <>
                            <AccordionPanel pb={4}>
                              <Box
                                display={'flex'}
                                justifyContent={'center'}
                                h={'50%'}
                              >
                                <ReqCard requirement={req} ref={setNodeRef} />
                              </Box>
                            </AccordionPanel>
                          </>
                        )
                      }
                    })}
                  </h2>
                </AccordionItem>
              </Accordion>
            </>
          ))}
        </>
      </Stack>
    </>
  )
}
export default Accord
