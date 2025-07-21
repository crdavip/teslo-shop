import { create } from "zustand";

interface State {
  isSideOpen: boolean;
  openSide: () => void;
  closeSide: () => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideOpen: false,
  openSide: () => set({ isSideOpen: true }),
  closeSide: () => set({ isSideOpen: false }),
}));
