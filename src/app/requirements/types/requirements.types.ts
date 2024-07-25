import { UserEntity } from '@/app/users/types/user.types'
import {
  ReqTypeFieldEntity,
  RequirementFieldValueEntity,
} from './requirement-type-field'

export interface NewReq {
  title: string
  userId: number | null
  stateId: number
  requirementFieldValue: {
    requirementTypeFieldId: number
    value: string
  }[]
}

export interface RequirementsEntity {
  id: number
  title: string
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
  requirementFieldValue: RequirementFieldValue[]
}
