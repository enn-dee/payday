import BalanceStore from "../zustand/BalanceStore";

const BalanceCard = () => {
  const { balance } = BalanceStore();
  return (
    <div className="w-60 h-32 bg-slate-700 rounded-lg p-4 flex justify-center items-center my-8 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <h2 className="text-3xl text-white font-mono text-center">
        Balance{" "}
        <span className="text-green-400 font-semibold">
          {balance !== null ? `$${balance.toFixed(2)}` : "Fetching..."}
        </span>
      </h2>
    </div>
  );
};

export default BalanceCard;
