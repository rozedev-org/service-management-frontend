export interface ReqTypeFieldEntity {
  id: number
  title: string
  type: string
  requirementTypeId: number
  order: number
  isOptional: boolean
  isRequired: boolean
  options: any[]
}

export interface UpdateReqTypeField {
  id?: number
  title: string
  type: string
  requirementTypeId: number
  order: number
}

export interface NewReqTypeField {
  title: string
  type: string
  order: number
  isOptional: boolean
  isRequired: boolean
}

export interface RequirementFieldValueEntity {
  id: number
  value: string
  requirementTypeFieldId: number
  requirementId: number
}
