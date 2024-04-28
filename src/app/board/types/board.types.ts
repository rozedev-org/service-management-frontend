import { RequirementsEntity } from '@/app/requirements/types/req.types'

export interface BoardEntity {
  id: number
  title: string
  secuence: number
  createdAt: Date
  updatedAt: Date
  Requirement: RequirementsEntity[]
}
