import { create } from 'zustand'


type ProfileState = {
    id:number;
    getId:(id:number)=>void;    
}

export const useUserId = create<ProfileState>((set) => ({
    id: 0, 
    getId: (id) => set({ id }), 
  }));