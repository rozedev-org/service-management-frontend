import { config } from "@/config"
import axios from "axios"

export const deleteUser = async (id: number) => {
    await axios.delete(
        `${config.bff.url}/users/${id}`
      )
}