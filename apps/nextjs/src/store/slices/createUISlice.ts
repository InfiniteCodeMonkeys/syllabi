import { RootState } from "store";

export const createUISlice = (
  set: (arg0: { courseModalOpen: string }) => void,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: () => RootState,
) => ({
  courseModalOpen: "",

  setCourseModalOpen: (id: string) => {
    set({ courseModalOpen: id });
  },
});
