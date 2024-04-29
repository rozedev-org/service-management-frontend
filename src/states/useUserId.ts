import { create } from 'zustand'
import { DateTime } from 'luxon'

type SessionState = {
  id: number
  isLoggedIn: boolean
  setId: (id: number) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setSessionExpiration: (ISOExpirationDate: string) => void
  sessionTimeout: NodeJS.Timeout | null
}

/**
 * Represents the state of a user session.
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
  /**
   * The timeout for the session.
   */
  sessionTimeout: null,
  /**
   * Sets the session expiration based on the provided ISO expiration date.
   * @param ISOExpirationDate - The ISO expiration date.
   */
  setSessionExpiration: (ISOExpirationDate) => {
    const dt = DateTime.fromISO(ISOExpirationDate)
    const mili = dt.toMillis()
    const sessionTimeout = setTimeout(() => {
      set({ isLoggedIn: false })
    }, mili)
    set({ sessionTimeout })
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
}))
