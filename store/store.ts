import { create } from "zustand";

export type teamStoreType = {
  team_name: string | null;
  team_id: number | null;
  selectTeamName: (value: string) => void;
  selectTeamId: (value: number) => void;
  totalTeam?: number | null;
  setTotalTeam: (value: number) => void;
};

export const useTeamStore = create<teamStoreType>()((set) => ({
  team_id: null,
  team_name: null,
  selectTeamName: (value) => set({ team_name: value }),
  selectTeamId: (value) => set({ team_id: value }),
  totalTeam: null,
  setTotalTeam: (value) => set({ totalTeam: value }),
}));
