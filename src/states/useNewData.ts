import { create } from 'zustand'

type NewDataState = {
  creating: boolean
  setIsCreating: (creating: boolean) => void
}

export const useNewData = create<NewDataState>((set) => ({
  creating: false,
  setIsCreating: (creating) => set({ creating }),
}))
