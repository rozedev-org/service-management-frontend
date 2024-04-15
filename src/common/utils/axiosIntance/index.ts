import { config } from '@/config'
import axios from 'axios'

export const axiosInstace = axios.create({
  withCredentials: true,
  baseURL: config.bff.url,
})
