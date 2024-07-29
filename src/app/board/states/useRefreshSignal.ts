import { create } from 'zustand'
import { BoardEntity } from '../types/board.types'

type RefreshState = {
  onRefresh: boolean
  setOnRefresh: (onRefresh: boolean) => void
}

export const useRefreshSignal = create<RefreshState>((set) => ({
  onRefresh: false,
  setOnRefresh: (onRefresh) => set({ onRefresh }),
}))
