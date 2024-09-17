export interface NewProfile {
  name: string
}
export interface UpdateProfile {
  name: string
}

export interface ProfileEntity {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}
