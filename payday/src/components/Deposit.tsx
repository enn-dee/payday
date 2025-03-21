import { useState } from "react";
import BalanceStore from "../zustand/BalanceStore";
import BalanceCard from "./BalanceCard";
import Navbar from "./Navbar";
import NavigateDashboard from "./NavigateDashboard";
import toast from "react-hot-toast";
import AuthStore from "../zustand/AuthStore";
import { useNavigate } from "react-router-dom";

const Deposit: React.FC = () => {
  const { balance, setBalance } = BalanceStore();
  const [amount, setAmount] = useState<number>(0);
  const { accessToken } = AuthStore();
  const navigate = useNavigate();

  const handleDeposit = async () => {
    const depositAmount = Math.floor(amount);
    if (!amount || amount > 10000 || amount <= 0) {
      toast.error("Amount should be in range 1-10k");
      return;
    }
    if (!accessToken) {
      toast.error("Try to login again..");
      navigate("/");
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/account/deposit`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ amount: depositAmount }),
        }
      );
      if (!response.ok) {
        toast.error("Failed to deposit");
        throw new Error("Failed to deposit");
      } else {
        const data = await response.json();

        toast.success(`Deposited: ${depositAmount}`);
        setBalance(balance + depositAmount);
        // console.log("data: ", data);
      }
    } catch (error: unknown) {
      // console.log("Error in deposite: ", error);
    }
  };
  return (
    <div className="flex flex-col w-full h-full items-center px-4 py-6 bg-gray-800">
      <Navbar />
      <div className="my-4 flex w-full justify-start items-start">
        <NavigateDashboard />
      </div>
      <BalanceCard />
      <input
        type="number"
        value={amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAmount(Number(e.target.value))
        }
        className=" w-1/2 bg-slate-600  p-2 rounded-lg  border-none outline-none text-white font-extrabold"
      />
      <button
        onClick={handleDeposit}
        className="bg-green-700 p-2 rounded-md text-white font-mono my-4"
      >
        Submit
      </button>
    </div>
  );
};

export default Deposit;
