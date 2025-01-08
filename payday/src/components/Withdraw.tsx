import React, { ChangeEvent, useEffect, useState } from "react";
import BalanceCard from "./BalanceCard";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import BalanceStore from "../zustand/BalanceStore";
import NavigateDashboard from "./NavigateDashboard";
import AuthStore from "../zustand/AuthStore";
import { useNavigate } from "react-router-dom";

const Withdraw: React.FC = () => {
  const { balance, setBalance } = BalanceStore();
  const [amount, setAmount] = useState<number>(0);
  const { accessToken } = AuthStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      toast.error("Try login again..");
      navigate("/");
    }
  }, []);
  const handleWithdraw = async () => {
    const WithdrawAmount: number = Math.floor(amount);
    try {
      if (!amount || WithdrawAmount > balance) {
        toast.error("Enter valid amount");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/accound/withdraw`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ amount: WithdrawAmount }),
        }
      );
      if (response.ok) {
        toast.success(`Successfully withdrawn ${WithdrawAmount}`);
        setBalance(balance - WithdrawAmount);
      } else {
        const data = await response.json();
        throw new Error(data);
      }
      return;
    } catch (error) {
      console.log("error in withdraw ", error);
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAmount(Number(e.target.value))
        }
        className=" w-1/2 bg-slate-600  p-2 rounded-lg  border-none outline-none text-white font-extrabold"
      />
      <button
        onClick={handleWithdraw}
        className="bg-green-700 p-2 rounded-md text-white font-mono my-4"
      >
        Submit
      </button>
    </div>
  );
};

export default Withdraw;
