export interface LoginEntity {
  user: User
  expiresIn: string
}

export interface User {
  id: number
  userName: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}
