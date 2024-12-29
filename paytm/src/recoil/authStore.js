import { atom } from "recoil";

export const accessState = atom({
  key: "accessState",
  default: localStorage.getItem("accessToken") || null, 
});

export const refreshState = atom({
  key: "refreshState",
  default: localStorage.getItem("refreshToken") || null, 
});
