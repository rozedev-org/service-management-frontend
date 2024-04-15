import { axiosInstace } from '@/common/utils/axiosIntance'
import { config } from '@/config'

export const deleteUser = async (id: number) => {
  await axiosInstace.delete(`${config.bff.url}/users/${id}`)
}
