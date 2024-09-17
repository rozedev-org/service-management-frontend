export interface ReqStateEntity {
  id: number
  title: string
  secuence: number
  createdAt: Date
  updatedAt: Date
  stateType: string
}

export interface NewReqState {
  title: string
  secuence: number
  stateType: string
}
