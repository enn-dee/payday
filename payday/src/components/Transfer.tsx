import { useState } from "react";
import BalanceCard from "./BalanceCard";
import Navbar from "./Navbar";
import NavigateDashboard from "./NavigateDashboard";
import AuthStore from "../zustand/AuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BalanceStore from "../zustand/BalanceStore";

const Transfer = () => {
  const [amount, setAmount] = useState<number>(0);
  const [id, setId] = useState<string>("");
  const { accessToken } = AuthStore();
  const { setBalance, balance } = BalanceStore();
  const navigate = useNavigate();

  const handleTransfer = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!accessToken) {
      toast.error("Try to login...");
      navigate("/");
    }
    if (!amount || amount <= 0) {
      toast.error("Enter valid amount range");
      return;
    }
    if (!id) {
      toast.error("Enter valid id");
    }

    try {
      const depositAmount = Math.floor(amount);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/transfer`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ id: id, amount: depositAmount }),
      });
      if (!response.ok) {
        const data = await response.json();
        toast.error("Failed to deposit , error: ", data);
        throw new Error(data.message);
      } else {
        const data = await response.json();
        toast.success(`Deposited: ${depositAmount}`);
        // console.log("data: ", data);
        setBalance(balance - depositAmount);

        return;
      }
    } catch (error) {
      // console.log("Error in transfer compo: ", error);
      toast.error(error.message);
    } finally {
      setAmount(0);
      setId("");
    }
  };
  return (
    <div className="flex flex-col w-full h-full items-center px-4 py-6 bg-gray-800">
      <Navbar />
      <div className="my-4 flex w-full justify-start items-start">
        <NavigateDashboard />
      </div>
      <BalanceCard />
      <div className="flex flex-row gap-4 justify-around items-center">
        <input
          placeholder="User Id"
          type="text"
          value={id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setId(e.target.value)
          }
          className=" w-1/2 bg-slate-600  p-2 rounded-lg  border-none outline-none text-white font-extrabold"
        />
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(Number(e.target.value))
          }
          className=" w-1/2 bg-slate-600  p-2 rounded-lg  border-none outline-none text-white font-extrabold"
        />
      </div>
      <button
        onClick={handleTransfer}
        className="bg-green-700 p-2 rounded-md text-white font-mono my-4"
      >
        Submit
      </button>
    </div>
  );
};

export default Transfer;
