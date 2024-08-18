/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CardContainer } from '@/components/Card/CardContainer/CardContainer'
import { SearchInput } from '@/components/input/SearchInput'
import { PaginatedTable } from '@/components/table/PaginatedTable/PaginatedTable'
import React, { useEffect } from 'react'
import { ProfileEntity } from './types/profile.types'
import { profilesColumns } from './types/ProfileColumnDef'
import { useProfiles } from './hooks/useProfile'
import { PaginationParams } from '@/common/interfaces/response.interface'
import AddProfileButton from './components/AddProfileButton'

export default function ProfilePage() {
  const {
    profile,
    meta,
    isLoading,
    fetchProfiles,
    handlePageChange,
    handlePerRowsChange,
  } = useProfiles()

  useEffect(() => {
    const queryPamas: PaginationParams = {
      page: 1,
      take: 5,
    }
    fetchProfiles(queryPamas)
  }, [])
  return (
    <CardContainer
      title='Lista de Perfiles'
      optionsButton={
        <>
          <AddProfileButton />
        </>
      }
    >
      <SearchInput
        maxW={'320px'}
        ml={'auto'}
        onChangeHandler={() => {
          console.log('profile page')
        }}
      ></SearchInput>
      <PaginatedTable<ProfileEntity>
        meta={meta}
        data={profile}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        columns={profilesColumns}
        isLoadingData={isLoading}
      />
    </CardContainer>
  )
}
