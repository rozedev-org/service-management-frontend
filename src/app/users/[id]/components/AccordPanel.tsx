import { RequirementEntity } from '@/app/requirements/types/requirements.types'
import { UserEntity } from '../../types/user.types'
import { AccordionPanel, Box } from '@chakra-ui/react'
import ReqModal from '@/app/board/components/ReqModal'

interface AccordionPanelType {
  req: RequirementEntity
  user: UserEntity
}

export default function ReqAccordPanel(props: AccordionPanelType) {
  const requirement = { ...props.req, user: props.user }
  return (
    <AccordionPanel pb={4}>
      <Box display={'flex'} justifyContent={'center'} h={'50%'}>
        <ReqModal requirement={requirement} />
      </Box>
    </AccordionPanel>
  )
}
