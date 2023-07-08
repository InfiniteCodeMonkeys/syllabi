import { create } from "zustand";
import { createUISlice } from "./slices/createUISlice";
import { createChatSlice } from "./slices/createChatSlice";

export type RootState = {
  namespace: string;
  setNamespace: (id: string) => void;
  setCourseModalOpen: (id: string) => void;
  suggestionModalOpen: boolean;
  setSuggestionModalOpen: (open: boolean) => void;
  howWorkModalOpen: boolean;
  setHowWorkModalOpen: (open: boolean) => void;
  adminModalOpen: boolean;
  setAdminModalOpen: (open: boolean) => void;
};

const useStore = create<RootState>((set, get) => ({
  ...createChatSlice(set, get),
  ...createUISlice(set, get),
}));

export default useStore;
