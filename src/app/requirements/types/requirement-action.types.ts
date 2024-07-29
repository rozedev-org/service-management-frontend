import { ReqStateEntity } from './requirement-state.type'

export interface ReqActionsActions {
  current: ReqStateEntity
  remaining: ReqStateEntity[]
}
