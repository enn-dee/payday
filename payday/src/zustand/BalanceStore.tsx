import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BalanceState {
  balance: number ;
  setBalance: (balance: number) => void;
}

const BalanceStore = create<BalanceState>()(
  persist(
    (set) => ({
      balance: 0,
      setBalance: (balance) => set({ balance }),
    }),
    {
      name: "balance-store",
    }
  )
);

export default BalanceStore;
