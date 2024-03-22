import axios from "axios"

export const deleteUser = async (id: number) => {
    await axios.delete(
        `http://localhost:8000/api/service-manager-service/v1/users/${id}`
      )
}