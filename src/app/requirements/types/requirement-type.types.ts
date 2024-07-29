import {
  NewReqTypeField,
  ReqTypeFieldEntity,
  UpdateReqTypeField,
} from './requirement-type-field'

export interface NewReqType {
  name: string
  requirementTypeField: NewReqTypeField[]
}

export interface UpdateReqType {
  name: string
  requirementTypeField: UpdateReqTypeField[]
}

export interface ReqTypeEntity {
  id: number
  name: string
  requirementTypeField: ReqTypeFieldEntity[]
}
