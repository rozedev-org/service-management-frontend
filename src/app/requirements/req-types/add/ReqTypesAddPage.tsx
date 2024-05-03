'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { FormControl, FormLabel, VStack, Text } from '@chakra-ui/react'
import {
  useCreateReqTypeForm,
  useRequirementsTypes,
} from '../hook/useRequirementsTypes'

export default function ReqTypesAddPage() {
  const { ReqTypeForm } = useCreateReqTypeForm()
  const { reqTypeQuery, fetchReqType } = useRequirementsTypes()
  useEffect(() => {
    fetchReqType()
  }, [])

  return (
    <CardContainer title='Crear tipo de Requerimiento'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void ReqTypeForm.handleSubmit()
        }}
      >
        <VStack>
          {reqTypeQuery.map((req) =>
            req.requirementTypeId.map((data) => (
              <>
                <FormControl>
                  <FormLabel>{data.title}</FormLabel>
                  <Text>123</Text>
                </FormControl>
              </>
            ))
          )}
        </VStack>
      </form>
    </CardContainer>
  )
}
