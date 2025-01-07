import { useState } from "react";
import BalanceCard from "./BalanceCard";
import Navbar from "./Navbar";
import NavigateDashboard from "./NavigateDashboard";

const Transfer = () => {
  const [amount, setAmount] = useState<number>(0);
  const [id, setId] = useState<string>("");
  const handleTransfer = () => {};
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
