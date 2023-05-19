import { RootState } from "store";

export const createUISlice = (
  set: (arg0: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: () => RootState,
) => ({
  courseModalOpen: "",

  setCourseModalOpen: (id: string) => {
    set({ courseModalOpen: id });
  },

  suggestionModalOpen: false,
  setSuggestionModalOpen: (open: boolean) => {
    set({ suggestionModalOpen: open });
  },

  howWorkModalOpen: false,
  setHowWorkModalOpen: (open: boolean) => {
    set({ howWorkModalOpen: open });
  },

  adminModalOpen: false,
  setAdminModalOpen: (open: boolean) => {
    set({ adminModalOpen: open });
  },
});
