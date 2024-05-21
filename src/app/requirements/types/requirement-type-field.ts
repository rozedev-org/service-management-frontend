export interface ReqTypeFieldEntity {
  id: number
  title: string
  type: string
  requirementTypeId: number
}

export interface UpdateReqTypeField {
  id?: number
  title: string
  type: string
  requirementTypeId: number
}

export interface NewReqTypeField {
  title: string
  type: string
}

export interface RequirementFieldValueEntity {
  id: number
  value: string
  requirementTypeFieldId: number
  requirementId: number
}
