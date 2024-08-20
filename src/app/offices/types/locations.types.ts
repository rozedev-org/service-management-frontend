export interface StatesEntity {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}
export interface CitiesEntity {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  stateId: number
}
export interface TownsEntity {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  cityId: number
}
