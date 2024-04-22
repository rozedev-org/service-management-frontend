import { create } from 'zustand'

type ProfileState = {
  id: number
  setId: (id: number) => void
}

export const useUserId = create<ProfileState>((set) => ({
  id: 0,
  setId: (id) => set({ id }),
}))
