import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  accessToken: null | string;
  refreshToken: null | string;
  setTokens: (accessToken: string, refreshToken: string) => void;
  removeTokens: () => void;
  addAccessToken: (token: string) => void;
  addRefreshToken: (token: string) => void;
}
 
const AuthStore = create<UserState>()(
  persist(
    (set, get, api) => ({
      accessToken: null,
      refreshToken: null,

      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),

      removeTokens: () => {
        set({ accessToken: null, refreshToken: null });
        api.persist.clearStorage();
      },

      addAccessToken: (token: string) => set({ accessToken: token }),
      addRefreshToken: (token: string) => set({ refreshToken: token }),
    }),
    {
      name: "auth-tokens", 

      onRehydrateStorage: (state) => {
        if (state) {
          // console.log("Rehydrating state:", state);
        } else {
          // console.warn("No state found to rehydrate.");
        }
      },
    }
  )
);

export default AuthStore;
