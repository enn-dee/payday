import { atom } from "recoil";
// const balance = localStorage.getItem("balance");
export const balanceState = atom({
  key: "balanceState",
  default: null,
});
