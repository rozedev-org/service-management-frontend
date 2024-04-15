export interface LoginEntity {
  user: User
  token: string
}

export interface User {
  id: number
  userName: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}
