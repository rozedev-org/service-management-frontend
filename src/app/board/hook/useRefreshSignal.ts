import { create } from 'zustand'
import { BoardEntity } from '../types/board.types'

type State = {
  refresh: boolean
  boardStates: BoardEntity[]
  refreshBoardState: (refresh: boolean) => void
  setBoardStates: (boardState: BoardEntity[]) => void
}

export const useRefreshSignal = create<State>((set) => ({
  refresh: false,
  boardStates: [],
  refreshBoardState: () => set((state) => ({ refresh: !state.refresh })),
  setBoardStates: (boardStates) => set({ boardStates }),
}))
