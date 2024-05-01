'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useCreateReqTypeForm } from '../hook/useRequirementsTypes'

export default function ReqTypesAddPage() {
  const { ReqTypeForm } = useCreateReqTypeForm()
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
          <FormControl isRequired>
            <FormLabel>Titulo</FormLabel>
            {ReqTypeForm.Field({
              name: 'name',
              children: (field) => (
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              ),
            })}
          </FormControl>
          <Button type='submit'>Guardar</Button>
        </VStack>
      </form>
    </CardContainer>
  )
}
