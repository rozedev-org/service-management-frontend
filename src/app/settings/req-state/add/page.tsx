'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useCreateReqStateForm } from '../hook/useRequirementState'

export default function ReqStateAddPage() {
  const { ReqStateForm } = useCreateReqStateForm()
  return (
    <CardContainer title='Crear Requerimiento'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void ReqStateForm.handleSubmit()
        }}
      >
        <VStack>
          <FormControl isRequired>
            <FormLabel>Titulo</FormLabel>
            {ReqStateForm.Field({
              name: 'title',
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
          <FormControl isRequired>
            <FormLabel>Secuencia</FormLabel>
            {ReqStateForm.Field({
              name: 'secuence',
              children: (field) => (
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
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
