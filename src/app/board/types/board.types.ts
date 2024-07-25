import { RequirementsEntity } from '@/app/requirements/types/requirements.types'

export interface BoardEntity {
  id: number
  title: string
  secuence: number
  createdAt: Date
  updatedAt: Date
  requirement: RequirementsEntity[]
}
