import { UserEntity } from '@/app/users/types/user.types'

export interface NewReq {
  title: string
  userId: number | null
  stateId: number
}
export interface NewReqState {
  title: string
  secuence: number
}
export interface RequirementsEntity {
  id: number
  title: string
  userId: number | null
  createdAt: Date
  updatedAt: Date
  user: UserEntity | null
  stateId: number
}
export interface ReqStateEntity {
  id: number
  title: string
  secuence: number
  createdAt: Date
  updatedAt: Date
}
export interface ReqActionsActions {
  current: ReqStateEntity
  remaining: ReqStateEntity[]
}
