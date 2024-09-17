import { UserEntity } from '@/app/users/types/user.types'
import {
  ReqTypeFieldEntity,
  RequirementFieldValueEntity,
} from './requirement-type-field'

export interface NewReq {
  userId: number | null
  stateId: number
  requirementTypeId: number
  requirementFieldValue: {
    requirementTypeFieldId: number
    value: string
  }[]
}

export interface RequirementsEntity {
  id: number
  userId: number | null
  createdAt: Date
  updatedAt: Date
  user: UserEntity | null
  stateId: number
  requirementTypeId: number
}

interface RequirementFieldValue extends RequirementFieldValueEntity {
  requirementTypeField: ReqTypeFieldEntity
}

export interface RequirementEntity extends RequirementsEntity {
  requirementType: {
    id: number
    name: string
  }
  requirementFieldValue: RequirementFieldValue[]
}
