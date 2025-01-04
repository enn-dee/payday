import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BalanceState {
  balance: number | null;
  setBalance: (balance: number) => void;
}

const BalanceStore = create<BalanceState>()(
  persist(
    (set) => ({
      balance: null,
      setBalance: (balance) => set({ balance }),
    }),
    {
      name: "balance-store",
    }
  )
);

export default BalanceStore;
