import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { StorageStoreName } from "./constants";

type State = {
  walletModal: boolean;
  otherModal: boolean;
};

type Actions = {
  setWalletModal: (value: State["walletModal"]) => void;
  setOtherModal: (value: State["otherModal"]) => void;
};

const useModalStore = create<State & Actions>()(
  devtools(
    // show in Redux devtool
    persist(
      (set) => ({
        walletModal: false,
        otherModal: false,
        setWalletModal: (value) => set(() => ({ walletModal: value })),
        setOtherModal: (value) => set(() => ({ otherModal: value })),
      }),
      {
        name: StorageStoreName.MODAL,
      }
    )
  )
);

export default useModalStore;
