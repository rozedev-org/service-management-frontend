export interface NewUser {
  userName: string
  firstName: string
  lastName: string
  password: string
  profileId: number
}

export interface UserEntity {
  id: number
  userName: string
  firstName: string
  lastName: string
  password: string
  createdAt:	Date
  updatedAt:	Date
}
