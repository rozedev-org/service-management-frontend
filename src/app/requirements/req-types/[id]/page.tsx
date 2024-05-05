/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect } from 'react'
import { useRequirementType } from '../hook/useRequirementsTypes'

export default function ReqTypesDetailPage({
  params,
}: {
  params: { id: number }
}) {
  const { fetchReqType, reqType, setReqType } = useRequirementType()
  useEffect(() => {
    fetchReqType(params.id)
  }, [])

  return <div>ReqTypesDetailPage</div>
}
