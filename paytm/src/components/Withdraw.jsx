import { useEffect, useState } from "react";
import { useBalance } from "../context/BalanceContext";
import Navbar from "./Navbar";
import BalanceCard from "./BalanceCard";

function Withdraw() {
  const [amount, setAmount] = useState(0);

  const { balance, fetchBalance, loading } = useBalance();

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleWithdraw = () => {
    setAmount(0);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      <BalanceCard balance={balance} />
      <div className="flex flex-col w-screen  items-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-slate-400 outline-none border-none rounded-md  p-2 m-2"
        />
        <button
          onClick={handleWithdraw}
          className="bg-green-400 p-2 rounded-md "
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default Withdraw;
