import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const useTokenStore = create(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,

        addAccessToken: (token) => set(() => ({ accessToken: token })),
        addRefreshToken: (token) => set(() => ({ refreshToken: token })),
        removeAccessToken: () => set(() => ({ accessToken: null })),
        removeRefreshToken: () => set(() => ({ refreshToken: null })),

        setTokens: (accessToken, refreshToken) => {
          set(() => ({ accessToken, refreshToken }));
        },
      }),
      { name: "tokens" }
    )
  )
);

export default useTokenStore;
