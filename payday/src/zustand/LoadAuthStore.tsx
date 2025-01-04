import { create } from "zustand";
import { persist } from "zustand/middleware";

type page = boolean;
interface pageState {
  page: boolean;
  setPage: (page: page) => void;
}

const PageAuthStore = create<pageState>()(
  persist(
    (set) => ({
      page: false,
      setPage: (page: page) => set({ page: page }),
    }),
    {
      name: "Load-page",
    }
  )
);

export default PageAuthStore;
