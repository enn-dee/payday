import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const BalanceStore = create(
  devtools(
    persist(
      (set) => ({
        balance: null,
        setBalance: (balance) => set(() => ({ balance: balance })),
      }),
      { name: "balance" }
    )
  )
);

export default BalanceStore;
