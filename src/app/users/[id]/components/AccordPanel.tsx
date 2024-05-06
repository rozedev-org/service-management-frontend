import { RequirementsEntity } from '@/app/requirements/types/req.types'
import { UserEntity } from '../../types/user.types'
import { AccordionPanel, Box } from '@chakra-ui/react'
import ReqCard from '@/app/board/components/ReqCard'

interface AccordionPanelType {
  req: RequirementsEntity
  user: UserEntity
}

export default function ReqAccordPanel(props: AccordionPanelType) {
  const requirement = { ...props.req, user: props.user }
  return (
    <AccordionPanel pb={4}>
      <Box display={'flex'} justifyContent={'center'} h={'50%'}>
        <ReqCard requirement={requirement} />
      </Box>
    </AccordionPanel>
  )
}
