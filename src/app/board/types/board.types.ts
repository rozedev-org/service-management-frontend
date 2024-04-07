export interface BoardEntity {
  id: number
  title: string
  secuence: number
  createdAt: Date
  updatedAt: Date
  Requirement: Requirement[]
}

export interface Requirement {
  id: number
  userId: number
  stateId: number
  title: string
  createdAt: Date
  updatedAt: Date
  user: User
}

export interface User {
  id: number
  userName: string
  firstName: string
  lastName: string
  password: string
  createdAt: Date
  updatedAt: Date
}
