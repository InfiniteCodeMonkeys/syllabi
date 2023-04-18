import { RootState } from "store";

export const createUISlice = (
  set: (arg0: {
    courseModalOpen: {
      id: string;
      data: { label: string; description: string };
    };
  }) => void,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: () => RootState,
) => ({
  courseModalOpen: {
    id: "",
    data: {
      label: "",
      description: "",
    },
  },

  setCourseModalOpen: ({
    id,
    data,
  }: {
    id: string;
    data: { label: string; description: string };
  }) => {
    set({ courseModalOpen: { id, data } });
  },
});
