/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { appRoutes } from '@/appRoutes'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { VStack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useCustomer, useUpdateCustomerForm } from '../../hook/useCustomer'
import { useRouter } from 'next/navigation'
import ModalUpdateCustomers from '../components/ModalUpdateCustomers'

export default function UpdateCustomerPage({
  params,
}: {
  params: { id: number }
}) {
  const { customer, fetchCustomer, isLoading } = useCustomer(params.id)
  const { updateCustomerForm } = useUpdateCustomerForm(customer)
  const router = useRouter()
  const handleUpdate = async () => {
    await updateCustomerForm.handleSubmit()
    router.push(appRoutes.home.customers.getOne.url(params.id))
  }

  useEffect(() => {
    fetchCustomer()
  }, [])

  return (
    <CardContainer title='Actualizar Cliente' isLoading={isLoading}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void updateCustomerForm.handleSubmit()
        }}
      >
        <VStack>
          {/* Name */}
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            {updateCustomerForm.Field({
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
          <ModalUpdateCustomers handleAction={handleUpdate} />
        </VStack>
      </form>
    </CardContainer>
  )
}
