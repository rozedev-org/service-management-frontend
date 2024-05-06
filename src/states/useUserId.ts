import { create } from 'zustand'
import { DateTime } from 'luxon'
import { axiosInstace } from '@/common/utils/axiosIntance'
import { LoginEntity } from '@/app/auth/login/types/login.types'

type SessionState = {
  id: number
  isLoggedIn: boolean
  isExpired: boolean
  setId: (id: number) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  login: (username: string, password: string) => Promise<boolean>
  sessionTimeout: NodeJS.Timeout | null
  validateSession: () => Promise<boolean>
}

/**
 * Represents the state of a user session.
 */
/**
 * Custom hook for managing user session state.
 * @returns An object containing the user session state and related functions.
 */
export const useUserSession = create<SessionState>((set) => ({
  /**
   * The user ID.
   */
  id: 0,
  /**
   * Indicates whether the user is logged in or not.
   */
  isLoggedIn: false,
  isExpired: false,
  /**
   * The timeout for the session.
   */
  sessionTimeout: null,

  /**
   * Logs in the user with the provided username and password.
   * @param username - The username.
   * @param password - The password.
   * @returns A boolean indicating whether the login was successful or not.
   */
  login: async (username, password) => {
    try {
      const response = await axiosInstace.post<LoginEntity>(`/auth/login`, {
        username,
        password,
      })

      const dt = DateTime.fromISO(response.data.expiresIn)
      const dtNow = DateTime.now()

      const miliDiff = dt.diff(dtNow).as('milliseconds')

      const sessionTimeout = setTimeout(() => {
        set({ isLoggedIn: false, isExpired: true, sessionTimeout: null })
      }, miliDiff)
      set({ sessionTimeout, isLoggedIn: true, id: response.data.user.id })
      return true
    } catch (e) {
      return false
    }
  },

  /**
   * Sets the user ID.
   * @param id - The user ID.
   */
  setId: (id) => set({ id }),

  /**
   * Sets whether the user is logged in or not.
   * @param isLoggedIn - Indicates whether the user is logged in or not.
   */
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  /**
   * Validates the user session.
   * @returns A promise that resolves when the session is validated.
   */
  validateSession: async () => {
    try {
      const response = await axiosInstace.post<LoginEntity>('/auth/validate')
      const dt = DateTime.fromISO(response.data.expiresIn)
      const dtNow = DateTime.now()

      const miliDiff = dt.diff(dtNow).as('milliseconds')

      const sessionTimeout = setTimeout(() => {
        set({ isLoggedIn: false, isExpired: true, sessionTimeout: null })
      }, miliDiff)

      set({ sessionTimeout, isLoggedIn: true, id: response.data.user.id })

      return true
    } catch (e) {
      set({ isLoggedIn: false })
      return false
    }
  },
}))
