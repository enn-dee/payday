import { useState } from "react";
import Navbar from "./Navbar";
import BalanceCard from "./BalanceCard";
import toast from "react-hot-toast";
import BalanceStore from "../../zustand/BalanceZus";
// import axios from "axios";
import useTokenStore from "../../zustand/AuthZus";

function Withdraw() {
  const { balance, setBalance } = BalanceStore();
  const { accessToken } = useTokenStore();

  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
    const withdrawalAmount = parseFloat(amount);

    // Input validation
    if (
      !withdrawalAmount ||
      withdrawalAmount <= 0 ||
      withdrawalAmount >= balance
    ) {
      toast.error("Enter a valid amount within your balance.");
      return;
    }

    try {
 
      const res = await fetch("http://localhost:3000/api/v1/accound/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ amount: withdrawalAmount }),
      });
      if (res.status != 200) {
        throw new Error("Failed to withdraw");
      }

      setBalance(balance - withdrawalAmount);

      toast.success(`Successfully withdrew: ${withdrawalAmount}`);
      setAmount("");
    } catch (error) {
      console.error("Error occurred during withdrawal:", error.message);
      toast.error(
        error.response?.data?.message || "An error occurred during withdrawal."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      <BalanceCard balance={balance} />
      <div className="flex flex-col w-screen items-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to withdraw"
          className="bg-slate-400 outline-none border-none rounded-md p-2 m-2"
        />
        <button
          onClick={handleWithdraw}
          className="bg-green-400 p-2 rounded-md"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default Withdraw;
