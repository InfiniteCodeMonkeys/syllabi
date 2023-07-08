import { RootState } from "store";

export const createChatSlice = (
  set: (arg0: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: () => RootState,
) => ({
  namespace: "",

  setNamespace: (id: string) => {
    set({ namespace: id });
  },
});
