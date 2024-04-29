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

export const useUserSession = create<SessionState>((set) => ({
  id: 0,
  isLoggedIn: false,
  sessionTimeout: null,
  setSessionExpiration: (ISOExpirationDate) => {
    const sessionTimeout = setSessionExpiration(ISOExpirationDate)
    set({ sessionTimeout })
  },
  setId: (id) => set({ id }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}))

const setSessionExpiration = (ISOExpirationDate: string) => {
  const dt = DateTime.fromISO(ISOExpirationDate)

  return setTimeout(() => {
    console.log('Session expired')
  }, dt.millisecond)
}
