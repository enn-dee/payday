import Axios from "axios";
import toast from "react-hot-toast";

export const FetchBalance = async (accessToken) => {
  let setBalance = null;
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const res = await Axios.get(
      "http://localhost:3000/api/v1/account/balance",
      {
        headers: headers,
      }
    )
      .then((response) => {
        const { balance } = response.data;
        if (balance !== null) {
          // localStorage.setItem("balance", balance);
          setBalance = balance;
        }
        return setBalance;
      })
      .catch((error) => {
        console.error("error in axios fetchBalance: ", error);
      });
    return res;
  } catch (error) {
    console.error("Error fetching balance:", error);
    toast.error("Error fetching balance");
    return null;
  }
};
