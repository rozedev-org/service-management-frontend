/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ReqTypeEntity } from '@/app/requirements/types/req.types'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { CustomTable } from '@/components/table/CustomTable'
import { SearchInput } from '@/components/input/SearchInput'
import { reqTypeCustomColumn } from './types/ReqTypesCustomTable'
import { useRequirementsTypes } from './hook/useRequirementsTypes'
import { useEffect } from 'react'
import { AddReqTypeButton } from './components/AddReqTypeButton'

export default function ReqTypePage() {
  const { reqTypes, fetchReqTypes, isLoading } = useRequirementsTypes()
  const reqTypeTable = CustomTable<ReqTypeEntity>({
    columns: reqTypeCustomColumn,
    data: reqTypes,
  })
  useEffect(() => {
    fetchReqTypes()
  }, [])

  return (
    <CardContainer
      isLoading={isLoading}
      title='Lista de Tipos de Requerimientos'
      optionsButton={<AddReqTypeButton />}
      searchInput={
        <SearchInput
          maxW={'320px'}
          ml={'auto'}
          onChangeHandler={() => {
            console.log('ReqTypePage')
          }}
        />
      }
    >
      {reqTypeTable}
    </CardContainer>
  )
}
