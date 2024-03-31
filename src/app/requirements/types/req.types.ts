import { UserEntity } from "@/app/users/types/user.types"

export interface NewReq{
  title:	string
  userId:	number | null
}
export interface RequirementsEntity {
  id:	number
  title:	string
  userId:	number | null
  createdAt:	Date
  updatedAt:	Date
  user: UserEntity | null
}
  