import { create } from 'zustand'

type SessionState = {
  id: number
  setId: (id: number) => void
}
export const useReqId = create<SessionState>((set) => ({
  id: 0,
  setId: (id) => set({ id }),
}))
